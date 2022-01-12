# Generic Angular Carousel Component

## What is it?

`@cristiansarghe/ng-generic-carousel` is a lightweight, mobile device friendly Angular carousel component made for ANY type of content, NOT only images.

## Changelog

### Version 3.0.0
- *Angular 12 support*
- Added drag-drop navigation support for mouse and touch inputs ([HammerJS](https://www.npmjs.com/package/hammerjs) is a new dependency)
- Changed navigation button hiding logic (includes changes to `Input()` parameters)

### Version 2.0.0

- *Updated package to Angular 12*
- Added round navigation option (when reaching the left or right side of the elements list, continue from the other side)

## Installation

`npm i @cristiansarghe/ng-generic-carousel`

## Basic usage

The component works by having a HTML template passed, along with an array of elements. By default, the component shows 3 elements at once.

```
<ng-generic-carousel [elements]="['John', 'Joanne', 'Jason', 'Jessica']">
	<ng-template #contentTemplate let-data="data">
		<p>I am {{data}}</p>
	</ng-template>

	<ng-template #leftButtonTemplate> &lt; </ng-template>
	<ng-template #rightButtonTemplate> &gt; </ng-template>
</ng-generic-carousel>
```

* `ng-generic-carousel` receives an array of objects or primitive values through `@Input() elements`.

* The component iterates through the array and repeats `contentTemplate` for each item. 

* To access the current item you can target the `data` variable (`let-data="data"`), as presented above, and then use it within the template.

* For a more generic approach, `leftButtonTemplate` and `rightButtonTemplate` must be specified in order to customize the look of the left and right buttons.


## Customization
### Content

* The `contentTemplate`-named `ng-template` provides the layout for each carousel element.
* The `leftButtonTemplate` and `rightButtonTemplate` elements provide the **content** for the buttons (in order to customize the arrows as desired).
* `@Input() visibleElementsCount` changes the number of elements shown at once on the screen.
* **NOTE**: By default, if `elements` has less items than specified by `visibleElementsCount`, the left and right scroll buttons will NOT be shown. You can change this behavior by modifying `@Input() hideNavigationButtonsWhenNotNeeded` to `false`.
* In order to hide the navigation buttons at all times, set the `hideNavigationButtons` input to `true`. This usually works with the drag-drop navigation (see `isDragDropEnabled` input)

Example: 

```
<ng-generic-carousel [elements]="['John', 'Joanne', 'Jason', 'Jessica']" [visibleElementsCount]="6" [hideNavigationButtons]="true" [isDragDropEnabled]="true">
	<ng-template #contentTemplate let-data="data">
		<p>I am {{data}}</p>
	</ng-template>

	<ng-template #leftButtonTemplate> &lt; </ng-template>			<!-- Will not be shown -->
	<ng-template #rightButtonTemplate> &gt; </ng-template>			<!-- Will not be shown -->
</ng-generic-carousel>
```

### Placeholders 

* The carousel can as well have placeholders that look all the same, with a layout provided in `placeholderTemplate`. 
* The placeholders appear **only if `elements` is null or empty**.
* The number of placeholders is 3 by default, but can be changed using `@Input() placeholderElementsCount`.

```
<ng-generic-carousel [elements]="[]" [placeholderElementsCount]="4">
	<ng-template #contentTemplate let-data="data">
		<p>I am {{data}}</p>
	</ng-template>

	<ng-template #placeholderTemplate>
		<p>This will be a name!</p>
	</ng-template>

	<ng-template #leftButtonTemplate> &lt; </ng-template>
	<ng-template #rightButtonTemplate> &gt; </ng-template>
</ng-generic-carousel>
```


### @Input()

| Input                       			| Type    | Required                   | Description                                                    												|
| ------------------------------------- | ------- | -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| elements             		  			| any[]   | Optional, default: []      | Array of objects or primitive values that represent each carousel item   										|
| placeholderElementsCount    			| number  | Optional, default: 3       | If placeholders are shown, this input sets how many placeholder elements to show								|
| visibleElementsCount   	  			| number  | Optional, default: 3       | Number of visible elements at a time			                            									|
| isRoundNavigation			  			| boolean | Optional, default: false   | Enable round carousel navigation (when left or right limits are reached, navigate to each other)				|
| hideNavigationButtons		  			| boolean | Optional, default: false   | Force hide left and right navigation buttons (all the time, can be used with isDragDropEnabled)				|
| hideNavigationButtonsWhenNotNeeded 	| boolean | Optional, default: true    | Hide left and right navigation buttons when navigation can not be done due to the little number of elements	|
| isDragDropEnabled			 			| boolean | Optional, default: true	   | Enable drag-drop navigation (without using the left and right buttons) 										|
| stickToClosestElement		 			| boolean | Optional, default: true	   | Stick navigation view window to closest element edge after drag-drop movement			 						|

### @Output()

| Output   | Type    | Description                                                    											                                                                     |
| ---------| ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| hasMoved | boolean | Emits *true* when drag movement starts and *false* 200ms after drag ends; can be watched and used to prevent carousel element clicks or trigger other actions after drag ends |

### ng-template

| Template              | Description							|
| --------------------- | ------------------------------------- |
| contentTemplate 		| Template for each carousel item 		|
| placeholderTemplate	| Template for each placeholder item	|
| leftButtonTemplate    | Template for left scroll button		|
| rightButtonTemplate   | Template for right scroll button 		|

