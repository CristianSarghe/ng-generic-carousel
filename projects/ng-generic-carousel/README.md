# Generic Angular Carousel Component


## What is it?

`@cristiansarghe/ng-generic-carousel` is a lightweight carousel component made for any type of content, NOT only images.

## Installation

`npm i @cristiansarghe/ng-generic-carousel`

## Basic usage

In the simplest terms, the component works by having a HTML template passed, along with an array of elements. By default, the component shows 3 elements at once.

```
<ng-generic-carousel [elements]="['John', 'Joanne', 'Jason', 'Jessica']">
	<ng-template #contentTemplate let-data="data">
		<p>I am {{data}}</p>
	</ng-template>

	<ng-template #leftButtonTemplate> < </ng-template>
	<ng-template #rightButtonTemplate> > </ng-template>
</ng-generic-carousel>
```

* `ng-generic-carousel` receives an array of objects or primitive values through `@Input() elements`.

* The component iterates through the array and repeats `contentTemplate` for each item. 

* To access the current item you can target the `data` variable (`let-data="data"`), as presented above, and then use it within the template.

* For a more generic approach, `leftButtonTemplate` and `rightButtonTemplate` must be specified in order to customize the look of the left and right buttons.


## Customization
### Content

* The `contentTemplate` named `ng-template` provides the layout for each carousel element.
* The `leftButtonTemplate` and `rightButtonTemplate` elements provide the **content** for the buttons (in order to customize the arrows as desired).
* `@Input() visibleElementsCount` changes the number of elements shown at once on the screen.
* **NOTE**: By default, if `elements` has less items than specified by `visibleElementsCount`, the left and right scroll buttons will NOT be shown. You can change this behavior by modifying `@Input() alwaysShowNavigationButtons` to `true`.

Example: 

```
<ng-generic-carousel [elements]="['John', 'Joanne', 'Jason', 'Jessica']" [visibleElementsCount]="6" [alwaysShowNavigationButtons]="true">
	<ng-template #contentTemplate let-data="data">
		<p>I am {{data}}</p>
	</ng-template>

	<ng-template #leftButtonTemplate><</ng-template>
	<ng-template #rightButtonTemplate>></ng-template>
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

	<ng-template #leftButtonTemplate><</ng-template>
	<ng-template #rightButtonTemplate>></ng-template>
</ng-generic-carousel>
```


### @Input()

| Input                       | Type    | Required                   | Description                                                    						|
| --------------------------- | ------- | -------------------------- | ------------------------------------------------------------------------------------ |
| alwaysShowNavigationButtons | boolean | Optional, default: false   | Show or hide navigation buttons when elements count is less than maximum 			|
| elements             		  | any[]   | Optional, default: []      | Array of objects or primitive values that represent each carousel item   			|
| placeholderElementsCount    | number  | Optional, default: 3       | If placeholders are shown, this input sets how many placeholder elements to show		|
| visibleElementsCount   	  | number  | Optional, default: 3       | Number of visible elements at a time			                            			|

### ng-template

| Template              | Description							|
| --------------------- | ------------------------------------- |
| contentTemplate 		| Template for each carousel item 		|
| placeholderTemplate	| Template for each placeholder item	|
| leftButtonTemplate    | Template for left scroll button		|
| rightButtonTemplate   | Template for right scroll button 		|

