<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/DaveWM/ngx-graphs/master/demo/src/assets/logo.svg">
</p>

# ngx-graphs - Angular library built with ❤ using ngx-library yeoman generator.

[![npm version](https://badge.fury.io/js/ngx-graphs.svg)](https://badge.fury.io/js/ngx-graphs)
[![Build Status](https://travis-ci.org/DaveWM/ngx-graphs.svg?branch=master)](https://travis-ci.org/DaveWM/ngx-graphs)
[![Coverage Status](https://coveralls.io/repos/github/DaveWM/ngx-graphs/badge.svg?branch=master)](https://coveralls.io/github/DaveWM/ngx-graphs?branch=master)
[![dependency Status](https://david-dm.org/DaveWM/ngx-graphs/status.svg)](https://david-dm.org/DaveWM/ngx-graphs)
[![devDependency Status](https://david-dm.org/DaveWM/ngx-graphs/dev-status.svg?branch=master)](https://david-dm.org/DaveWM/ngx-graphs#info=devDependencies)

## Demo

View all the directives in action at https://DaveWM.github.io/ngx-graphs

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 2 or higher, tested with 2.0.0)

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

Once installed you need to import the main module:
```js
import { LibModule } from 'ngx-graphs';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` LibModule .forRoot()`):
```js
import { LibModule } from 'ngx-graphs';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [LibModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` LibModule `:

```js
import { LibModule } from 'ngx-graphs';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [LibModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2017 David Martin. Licensed under the MIT License (MIT)

