# About
A class for easier cookies on the Website on the client's side.

# Usage
Adding cookies
```js
cookie.push( 'test1', 'test-value' );
console.log( cookie.cookies ) // [ [ 'test1', 'test-value' ] ]
console.log( document.cookie ) // 'test1=test-value'
cookie.push( 'test2', 'test-value', '/foo' );
console.log( cookie.cookies ) // [ [ 'test1', 'test-value' ], [ 'test2', 'test-value' ] ]
console.log( document.cookie ) // 'test1=test-value; test2=test-value'
```
Updating cookies
```js
cookie.push( 'test1', 'test-value' );
console.log( cookie.cookies ) // [ [ 'test1', 'test-value' ] ]
console.log( document.cookie ) // 'test1=test-value'
cookie.push( 'test1', 'test-value-update' );
console.log( cookie.cookies ) // [ [ 'test1', 'test-value-update' ] ]
console.log( document.cookie ) // 'test1=test-value-update'
```
Deleting cookies
```js
cookie.push( 'test1', 'test-value' );
console.log( cookie.cookies ) // [ [ 'test1', 'test-value' ] ]
console.log( document.cookie ) // 'test1=test-value'
cookie.delete( 'test1', '' );
console.log( cookie.length ) // 0
console.log( document.cookie ) // ''
```
Checking if the cookie exists
```js
cookie.push( 'test1', 'test-value' );
console.log( cookie.cookies ) // [ [ 'test1', 'test-value' ] ]
console.log( document.cookie ) // 'test1=test-value'
console.log( cookie.has( 'test1' ) ) // true
```
Get the cookie value
```js
cookie.push( 'test1', 'test-value' );
console.log( cookie.cookies ) // [ [ 'test1', 'test-value' ] ]
console.log( document.cookie ) // 'test1=test-value'
console.log( cookie.get( 'test1' ) ) // 'test-value'
```

# Author
Mateusz Krasuski