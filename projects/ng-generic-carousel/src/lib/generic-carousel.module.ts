import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GenericCarouselComponent } from './generic-carousel.component';

@NgModule({
	declarations: [
		GenericCarouselComponent
	],
	imports: [
		CommonModule
	],
	exports: [
		GenericCarouselComponent
	]
})
export class GenericCarouselModule { }
