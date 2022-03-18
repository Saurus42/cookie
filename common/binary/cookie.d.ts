/* tslint:disable */
/* eslint-disable */
/**
*/
export class Cookie {
  free(): void;
/**
* @param {string} name
* @param {string} value
* @param {string | undefined} path
* @param {string | undefined} domain
* @param {number | undefined} max_age
* @param {Date | undefined} expires
* @param {string | undefined} sanesite
*/
  push(name: string, value: string, path?: string, domain?: string, max_age?: number, expires?: Date, sanesite?: string): void;
/**
* @param {string} name
* @param {string} value
* @param {string | undefined} path
* @param {string | undefined} domain
*/
  delete(name: string, value: string, path?: string, domain?: string): void;
/**
* @param {string} name
* @returns {string}
*/
  get(name: string): string;
/**
* @param {string} name
* @returns {boolean}
*/
  has(name: string): boolean;
/**
*/
  constructor();
/**
* @returns {Array<any>}
*/
  readonly cookies: Array<any>;
/**
* @returns {number}
*/
  readonly length: number;
}
