import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GenericCarouselModule } from 'ng-generic-carousel';

import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		GenericCarouselModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
