import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HammerModule } from '@angular/platform-browser';
import { GenericCarouselComponent } from './generic-carousel.component';

@NgModule({
	declarations: [
		GenericCarouselComponent
	],
	imports: [
		CommonModule,
		HammerModule
	],
	exports: [
		GenericCarouselComponent
	]
})
export class GenericCarouselModule { }
