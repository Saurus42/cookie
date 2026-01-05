import init, { Cookie } from '../browser/cookie.js';

init().then( () => {
  const cookie = new Cookie();

  const currentDate = new Date();

  console.log( cookie.get_cookies() );

  console.log( 'The number of cookies in the collection.' );
  console.log( cookie.get_length() );

  let date = new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes() + 1, 0, 0 );

  cookie.push( 'test1', 'test-value1', undefined, undefined, undefined, date );

  console.log( cookie.has( 'test1' ) );
  console.log( document.cookie );

  console.log( 'The number of cookies in the collection.' );
  console.log( cookie.get_length() );

  date = new Date( currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes() + 1, 0, 0 );

  cookie.push( 'test2', 'test-value2', undefined, undefined, undefined, date );

  console.log( cookie.has( 'test2' ) );
  console.log( document.cookie );

  console.log( 'The number of cookies in the collection.' );
  console.log( cookie.get_length() );

  cookie.delete( 'test1', 'test-value2' );

  console.log( cookie.has( 'test1' ) );
  console.log( document.cookie );

  console.log( 'The number of cookies in the collection.' );
  console.log( cookie.get_length() );
} );