class Cookie {
  /**
   * @private
   */
  _day

  /**
   * @private
   */
  _month

  /**
   * @private
   * @type {Map<string, string>}
   */
  _cookies
  get cookies() {
    const cookies = [];
    for( const [key, value] of this._cookies ) {
      cookies.push( [ key, value ] );
    }
    return cookies;
  }
  set cookies( v ) {
    console.error( new Error( 'Cookies cannot be added this way.' ) );
  }

  get length() {
    return this._cookies.size;
  }

  set length( v ) {
    console.error( new Error( 'Cookies cannot be added this way.' ) );
  }

  constructor() {
    this._month = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    this._day = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
    this._url = location.hostname;
    this._cookies = new Map();
    const cookies = document.cookie.split( '; ' );
    for( const cookie of cookies ) {
      const data = cookie.split( '=' );
      this._cookies.set( data[0], data[1] );
    }
  }

  /**
   * Adding and updating cookies.
   * @param {string} name name cookie
   * @param {string} value value cookie
   * @param {string} [path] path cookie
   * @param {string} [domain] domain cookie
   * @param {string|number} [maxAge] max age cookie in miliseconds
   * @param {Date} [expires] the expiry date of the cookie
   * @param {string} [sanesite] using cookies on other websites
   * @returns {void}
   */
  push( name, value, path, domain, maxAge, expires, sanesite ) {
    document.cookie = `${name}=${value}; path=${path ? path : '/'}; domain=${domain ? domain : this._url}${maxAge ? `; max-age=${maxAge}` : ''}${expires ? `; expires=${`${this._day[expires.getDay()]}, ${expires.getDate() < 10 ? `0${expires.getDate()}` : expires.getDate()} ${this._month[expires.getMonth()]} ${expires.getFullYear()} ${expires.getHours() < 10 ? `0${expires.getHours()}` : expires.getHours()}:${expires.getMinutes() < 10 ? `0${expires.getMinutes()}` : expires.getMinutes()}:${expires.getSeconds() < 10 ? `0${expires.getSeconds()}` : expires.getSeconds()} UTC`}` : ''}; sanesite=${sanesite ? sanesite : 'lax'}`;
    this._cookies.set( name, value );
  }

  /**
   * Deleting cookies.
   * @param {string} name name cookie
   * @param {string} value value cookie
   * @param {string} [path] path cookie
   * @param {string} [domain] domain cookie
   * @returns {void}
   */
  delete( name, value, path, domain ) {
    document.cookie = `${name}=${value}; path=${path ? path : '/'}; domain=${domain ? domain : this._url}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    this._cookies.delete( name );
  }

  /**
   * Get cookies from the collection.
   * @param {string} name name cookie
   * @returns {string}
   */
  get( name ) {
    if( this._cookies.has( name ) )
      return this._cookies.get( name );
    else
      return '';
  }

  /**
   * Checks if the cookie exists.
   * @param {string} name name cookie
   * @returns {boolean}
   */
  has( name ) {
    return this._cookies.has( name );
  }
}

module.exports = Cookie;