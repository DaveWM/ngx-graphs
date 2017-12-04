<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/DaveWM/ngx-graphs/master/demo/src/assets/logo.svg">
</p>

# ngx-graphs

[![npm version](https://badge.fury.io/js/ngx-graphs.svg)](https://badge.fury.io/js/ngx-graphs)
[![Build Status](https://travis-ci.org/DaveWM/ngx-graphs.svg?branch=master)](https://travis-ci.org/DaveWM/ngx-graphs)
[![Coverage Status](https://coveralls.io/repos/github/DaveWM/ngx-graphs/badge.svg?branch=master)](https://coveralls.io/github/DaveWM/ngx-graphs?branch=master)
[![dependency Status](https://david-dm.org/DaveWM/ngx-graphs/status.svg)](https://david-dm.org/DaveWM/ngx-graphs)
[![devDependency Status](https://david-dm.org/DaveWM/ngx-graphs/dev-status.svg?branch=master)](https://david-dm.org/DaveWM/ngx-graphs#info=devDependencies)

## Overview

The aim of `ngx-charts` is to provide highly composable charting components. For example, to build a step area chart with an X and Y axis, you would use 2 `graph-axis` components and one `step-area-chart` component. Breaking down charts into small, composable components has many benefits. To name a few: 

* It gives you as much control as possible over layout
* You can swap out bits of the chart for your own implementation - if you don't like the provided `chart-legend`, just make your own.
* You can use each component individually, perhaps even not for their intended purpose 🤔

`ngx-charts` isn't opinionated about what you use for the overall layout, but [css grid](https://css-tricks.com/snippets/css/complete-guide-grid/) is the recommended option. You could also use absolute positioning, or a Javascript layout engine.

_Note:_ `ngx-charts` relies heavily on flexbox internally, it will not work in browsers that do not support flexbox.

## Installation
Install above dependencies via *npm*. 

Now install `ngx-graphs` via:
```shell
npm install --save ngx-graphs
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-graphs`:
```js
map: {
  'ngx-graphs': 'node_modules/ngx-graphs/bundles/ngx-graphs.umd.js',
}
```
---

## Example Usage

The source for the examples on the documentation site is [here](https://github.com/DaveWM/ngx-graphs/tree/master/demo/src/app) - `composition-demo` is an example of how to use CSS grid for layout. 

## Documentation

The documentation is available at https://DaveWM.github.io/ngx-graphs/doc

## Demo

View all the directives in action at https://DaveWM.github.io/ngx-graphs

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 4 or higher, tested with 5.0.3)

Once installed you need to import the main module:
```js
import { NgxGraphsModule } from 'ngx-graphs';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` NgxGraphsModule .forRoot()`):
```js
import { NgxGraphsModule } from 'ngx-graphs';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` NgxGraphsModule `:

```js
import { NgxGraphsModule } from 'ngx-graphs';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgxGraphsModule, ...], 
})
export class OtherModule {
}
```

## License

Copyright (c) 2017 David Martin. Licensed under the MIT License (MIT)

