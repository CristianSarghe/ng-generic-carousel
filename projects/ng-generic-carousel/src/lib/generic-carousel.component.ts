import { Component, Input, OnInit, ContentChild, TemplateRef } from '@angular/core';

@Component({
	selector: 'ng-generic-carousel',
	templateUrl: './generic-carousel.component.html',
	styleUrls: ['./generic-carousel.component.scss'],
	animations: []
})
export class GenericCarouselComponent implements OnInit {

	@ContentChild('contentTemplate') public contentTemplate !: TemplateRef<any>;
	@ContentChild('placeholderTemplate') public placeholderTemplate !: TemplateRef<any>;
	@ContentChild('leftButtonTemplate') public leftButtonTemplate !: TemplateRef<any>;
	@ContentChild('rightButtonTemplate') public rightButtonTemplate !: TemplateRef<any>;

	@Input() public alwaysShowNavigationButtons = false;
	@Input() public isRoundNavigation = false;
	@Input() public visibleElementsCount = 3;
	@Input() public placeholderElementsCount = 3;
	@Input() public set elements(value: any[] | undefined) {
		this._elements = value || [];
		this.initialElements = [...this._elements];
		this.leftIncrementIndex = this._elements.length - 1;
	}

	// tslint:disable-next-line:no-any
	public initialElements: any[] = [];
	public leftIncrementIndex = 0;

	public leftValue = 0;

	// tslint:disable-next-line:variable-name no-any
	private _elements: any[] = [];

	// tslint:disable-next-line:no-any
	public get elements(): any[] | undefined {
		return this._elements;
	}

	public get placeholderElements(): true[] {
		const arr: true[] = [];

		for (let index = 0; index < this.placeholderElementsCount || 0; ++index) {
			arr.push(true);
		}

		return arr;
	}

	constructor() { }

	ngOnInit(): void {
	}

	public goLeft(): void {
		if (this.leftValue === 0) {
			this.leftValue = (100 / this.visibleElementsCount) * (this.initialElements.length - (this.visibleElementsCount));
		} else {
			this.leftValue = (this.leftValue <= (100 / this.visibleElementsCount) ? 0 : (this.leftValue - (100 / this.visibleElementsCount)));
		}
	}

	public goRight(): void {
		if (this.leftValue < ((100 / this.visibleElementsCount) * (this._elements.length - this.visibleElementsCount))) {
			this.leftValue = (this.leftValue > (((this.elements?.length || 0) - (this.visibleElementsCount + 1)) * (100 / this.visibleElementsCount))) ? (((this.elements?.length || 0) - this.visibleElementsCount) * (100 / this.visibleElementsCount)) : (this.leftValue + (100 / this.visibleElementsCount));
		} else {
			this.leftValue = 0;
		}
	}

	public disableLeft(): boolean {
		if (this.visibleElementsCount >= (this.elements?.length || this.placeholderElementsCount || 0)) {
			return true;
		} else {
			if (!this.isRoundNavigation) {
				return this.leftValue <= 0;
			}
		}
	}

	public disableRight(): boolean {
		if (this.visibleElementsCount >= (this.elements?.length || this.placeholderElementsCount || 0)) {
			return true;
		} else {
			if (!this.isRoundNavigation) {
				return this.leftValue > (((this.elements?.length || this.placeholderElementsCount || 0) - (this.visibleElementsCount + 1)) * (100 / this.visibleElementsCount));
			}
		}
	}

}
