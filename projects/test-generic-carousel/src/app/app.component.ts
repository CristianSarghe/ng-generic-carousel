import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {

	public hasMoved: boolean;

	public log(data: any): void {
		if (!!this.hasMoved) {
			console.log('User moved carousel, card click event is stopped.');
			return;
		}

		console.log(data);
	}
}
