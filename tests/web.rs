//! Test suite for the Web and headless browsers.

#![cfg(target_arch = "wasm32")]

extern crate wasm_bindgen_test;
use std::option::Option::None;

use wasm_bindgen_test::*;

extern crate cookie;
use cookie::Cookie;

wasm_bindgen_test_configure!(run_in_browser);

#[wasm_bindgen_test]
fn pass() {
    let mut c = Cookie::new();
    c.push( "test1".into(), "test2".into(), None, None, None, None, None );
    c.push( "test3".into(), "test4".into(), None, None, None, None, None );
    assert_eq!(c.get_length(), 2);
}
