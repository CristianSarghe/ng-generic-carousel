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
	@Input() public visibleElementsCount = 3;
	@Input() public placeholderElementsCount = 3;
	@Input() public set elements(value: any[] | undefined) {
		this._elements = value || [];
	}

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

}
