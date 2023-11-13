/* tslint:disable */
/* eslint-disable */
/**
*/
export class Cookie {
  free(): void;
/**
*/
  constructor();
/**
* @param {string} name
* @param {string} value
* @param {string | undefined} [path]
* @param {string | undefined} [domain]
* @param {number | undefined} [max_age]
* @param {Date | undefined} [expires]
* @param {string | undefined} [sanesite]
*/
  push(name: string, value: string, path?: string, domain?: string, max_age?: number, expires?: Date, sanesite?: string): void;
/**
* @param {string} name
* @param {string} value
* @param {string | undefined} [path]
* @param {string | undefined} [domain]
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
  cookies: Array<any>;
/**
*/
  length: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_cookie_free: (a: number) => void;
  readonly cookie_new: () => number;
  readonly cookie_length: (a: number) => number;
  readonly cookie_set_length: (a: number, b: number) => void;
  readonly cookie_cookies: (a: number) => number;
  readonly cookie_set_cookies: (a: number, b: number) => void;
  readonly cookie_push: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number, n: number) => void;
  readonly cookie_delete: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly cookie_get: (a: number, b: number, c: number) => number;
  readonly cookie_has: (a: number, b: number, c: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
