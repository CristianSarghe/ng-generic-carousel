import { EventEmitter } from '@angular/core';
import { Component, Input, ContentChild, TemplateRef, Output } from '@angular/core';

@Component({
	selector: 'ng-generic-carousel',
	templateUrl: './generic-carousel.component.html',
	styleUrls: ['./generic-carousel.component.scss'],
	animations: []
})
export class GenericCarouselComponent {

	@ContentChild('contentTemplate') public contentTemplate !: TemplateRef<any>;
	@ContentChild('placeholderTemplate') public placeholderTemplate !: TemplateRef<any>;
	@ContentChild('leftButtonTemplate') public leftButtonTemplate !: TemplateRef<any>;
	@ContentChild('rightButtonTemplate') public rightButtonTemplate !: TemplateRef<any>;

	@Input() public hideNavigationButtonsWhenNotNeeded = true;
	@Input() public hideNavigationButtons = false;
	@Input() public isRoundNavigation = false;
	@Input() public isDragDropEnabled = true;
	@Input() public stickToClosestElement = true;
	@Input() public visibleElementsCount = 3;
	@Input() public placeholderElementsCount = 3;
	@Input() public set elements(value: any[] | undefined) {
		this._elements = value || [];
		this.initialElements = [...this._elements];
	}

	@Output() public hasMoved: EventEmitter<boolean> = new EventEmitter<boolean>();		// Emits "true" when movement begins and "false" 200ms after movement ends

	// ----- Tiles setup
	// tslint:disable-next-line:variable-name no-any
	private _elements: any[] = [];
	// tslint:disable-next-line:no-any
	public initialElements: any[] = [];

	// tslint:disable-next-line:no-any
	public get elements(): any[] | undefined {
		return this._elements;
	}

	public get placeholderElements(): true[] {
		return [...Array(this.placeholderElementsCount || 0)].map(() => true);
	}

	// ----- UI
	public leftShiftPercentage = 0;

	public get isElementsCoveringViewWidth(): boolean {
		return (this.elements?.length && (this.elements.length > this.visibleElementsCount)) || (!this.elements?.length && this.placeholderElements?.length && (this.placeholderElements.length > this.placeholderElementsCount));
	}

	public get isNavigationHidden(): boolean {
		return this.hideNavigationButtons || (
			this.hideNavigationButtonsWhenNotNeeded &&
			(this.elements?.length || this.placeholderElementsCount || 0) <= this.visibleElementsCount
		);
	}

	public get rightmostPosition(): number {
		return (100 / this.visibleElementsCount) * (this._elements.length - this.visibleElementsCount);
	}

	// ----- Drag-Drop specific
	public isPicked = false;
	public pickedLeftCoord = null;
	public backupLeftShiftPercentage = null;
	public elementWidthPx = null;
	public isMoved = false;

	constructor() { }

	public goLeft(): void {
		if (this.leftShiftPercentage === 0) {
			if (this.isRoundNavigation) {
				this.leftShiftPercentage = (100 / this.visibleElementsCount) * (this.initialElements.length - (this.visibleElementsCount));
			}
		} else {
			this.leftShiftPercentage = (this.leftShiftPercentage <= (100 / this.visibleElementsCount) ? 0 : (this.leftShiftPercentage - (100 / this.visibleElementsCount)));
		}
	}

	public goRight(): void {
		if (this.leftShiftPercentage < this.rightmostPosition) {
			const nextValue = (((this.elements?.length || 0) - (this.visibleElementsCount + 1)) * (100 / this.visibleElementsCount))
			const maxValue = (this.leftShiftPercentage + (100 / this.visibleElementsCount));
			this.leftShiftPercentage = (this.leftShiftPercentage > nextValue) ? nextValue : maxValue;
		} else {
			if (this.isRoundNavigation) {
				this.leftShiftPercentage = 0;
			}
		}
	}

	public disableLeft(): boolean {
		if (this.visibleElementsCount >= (this.elements?.length || this.placeholderElementsCount || 0)) {
			return true;
		} else {
			if (!this.isRoundNavigation) {
				return this.leftShiftPercentage <= 0;
			}
		}
	}

	public disableRight(): boolean {
		if (this.visibleElementsCount >= (this.elements?.length || this.placeholderElementsCount || 0)) {
			return true;
		} else {
			if (!this.isRoundNavigation) {
				return this.leftShiftPercentage > (((this.elements?.length || this.placeholderElementsCount || 0) - (this.visibleElementsCount + 1)) * (100 / this.visibleElementsCount));
			}
		}
	}

	public onMouseMove(e): void {
		this.onDragMove(e.screenX);
	}

	public onMouseLeave(e): void {
		this.onDragActionEnd(e.screenX);
	}

	public onMouseDown(e): void {
		const containerElement = e.path.find(item => item.classList.contains('carousel-container'));
		this.onDragActionStart(containerElement, e.screenX);
	}

	public onMouseUp(e): void {
		this.onDragActionEnd(e.screenX);
	}

	public onPanStart(e): void {
		const containerElement = e.srcEvent.path.find(item => item.classList.contains('carousel-container'));
		this.onDragActionStart(containerElement, e.center.x);
	}

	public onPanMove(e): void {
		this.onDragMove(e.center.x);
	}

	public onPanEnd(e): void {
		this.onDragActionEnd(e.center.x);
	}

	private onDragMove(coordinateX: number): void {
		if (!this.isPicked) { return; }

		const movementDistance = this.backupLeftShiftPercentage - (((coordinateX - this.pickedLeftCoord) / this.elementWidthPx) * 100);

		if (movementDistance < 0) {
			this.leftShiftPercentage = 0;
		} else if (movementDistance > this.rightmostPosition) {
			this.leftShiftPercentage = this.rightmostPosition;
		} else {
			this.leftShiftPercentage = movementDistance;
		}

		this.isMoved = true;
		this.hasMoved.emit(this.isMoved);
	}

	private onDragActionEnd(coordinateX: number): void {
		if (this.isPicked && this.stickToClosestElement) {
			let computedValue = this.backupLeftShiftPercentage - (((coordinateX - this.pickedLeftCoord) / this.elementWidthPx) * 100);

			if (computedValue < 0) {
				this.leftShiftPercentage = 0;
			} else if (computedValue > this.rightmostPosition) {
				this.leftShiftPercentage = this.rightmostPosition;
			} else {
				const elementWidth = 100 / this.visibleElementsCount;
				const offset = computedValue % elementWidth;

				if (offset > (elementWidth / 2)) {
					computedValue = computedValue - offset + elementWidth;
				} else {
					computedValue = computedValue - offset;
				}

				this.leftShiftPercentage = computedValue;
			}
		}

		this.isPicked = false;
		this.pickedLeftCoord = null;
		this.backupLeftShiftPercentage = null;
		this.elementWidthPx = null;

		setTimeout(() => {
			this.isMoved = false;
			this.hasMoved.emit(this.isMoved);
		}, 200);
	}

	private onDragActionStart(containerElement: any, coordinateX: number): void {
		if (!this.isDragDropEnabled) { return; }

		if (!!containerElement) {
			this.isPicked = true;
			this.pickedLeftCoord = coordinateX;
			this.backupLeftShiftPercentage = this.leftShiftPercentage;
			this.elementWidthPx = containerElement.getBoundingClientRect().width;
		}
	}
}
