declare class Cookie {
  /**
   * Site address.
   */
  url: string
  /**
   * Cookies in the collection.
   */
  cookies: string[][]
  /**
   * The number of cookies in the collection.
   */
  length: number
  /**
   * Adding and updating cookies.
   * @param name name cookie
   * @param value value cookie
   * @param path path cookie
   * @param domain domain cookie
   * @param maxAge max age cookie in miliseconds
   * @param expires the expiry date of the cookie
   * @param samesite using cookies on other websites
   */
  push( name: string, value: string, path?: string, domain?: string, maxAge?: string | number, expires?: Date, samesite?: string ): void
  /**
   * Deleting cookies.
   * @param name name cookie
   * @param value value cookie
   * @param path path cookie
   * @param domain domain cookie
   */
  delete( name: string, value: string, path?: string, domain?: string ): void
  /**
   * Get cookies from the collection.
   * @param name name cookie
   */
  get( name: string ): string
  /**
   * Checks if the cookie exists.
   * @param name name cookie
   */
  has( name: string ): boolean
}