/* tslint:disable */
/* eslint-disable */

export class Cookie {
  free(): void;
  [Symbol.dispose](): void;
  get_length(): number;
  get_cookies(): Array<any>;
  get(name: string): string;
  has(name: string): boolean;
  constructor();
  push(name: string, value: string, path?: string | null, domain?: string | null, max_age?: number | null, expires?: Date | null, sanesite?: string | null): void;
  delete(name: string, value: string, path?: string | null, domain?: string | null): void;
  refresh(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_cookie_free: (a: number, b: number) => void;
  readonly cookie_delete: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number) => void;
  readonly cookie_get: (a: number, b: number, c: number) => any;
  readonly cookie_get_cookies: (a: number) => any;
  readonly cookie_get_length: (a: number) => number;
  readonly cookie_has: (a: number, b: number, c: number) => any;
  readonly cookie_new: () => number;
  readonly cookie_push: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number, l: number, m: number) => void;
  readonly cookie_refresh: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly __wbindgen_externrefs: WebAssembly.Table;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
