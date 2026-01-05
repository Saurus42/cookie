mod date;

use std::collections::HashMap;
use js_sys::{Array, Date, JsString, Boolean};
use wasm_bindgen::prelude::*;
use web_sys::{window, HtmlDocument};
use web_sys::console::error_1;
use crate::date::{get_days, get_months};

#[wasm_bindgen]
pub struct Cookie {
    cookies: HashMap<String, String>,
    url: String,
    document: Option<HtmlDocument>
}

#[wasm_bindgen]
impl Cookie {
    #[wasm_bindgen( constructor )]
    pub fn new() -> Self {
        let Some(window) = window() else {
            return Self {
                cookies: HashMap::new(),
                url: String::new(),
                document: None
            }
        };
        let Some(document) = window.document() else {
            return Self {
                cookies: HashMap::new(),
                url: String::new(),
                document: None
            }
        };
        let Ok(document_html) = document.dyn_into::<HtmlDocument>() else {
            return Self {
                cookies: HashMap::new(),
                url: String::new(),
                document: None
            }
        };
        let Some(location) = document_html.location() else {
            return Self {
                cookies: HashMap::new(),
                url: String::new(),
                document: Some(document_html)
            }
        };
        let url = location.hostname().unwrap_or(String::new());
        let Ok(cook) = document_html.cookie() else {
            return Self {
                cookies: HashMap::new(),
                url,
                document: Some(document_html)
            }
        };
        Self {
            cookies: Self::bin_cookies(cook.as_bytes()),
            url: location.hostname().unwrap(),
            document: Some(document_html)
        }
    }

    fn bin_cookies(bytes: &[u8]) -> HashMap<String, String> {
        let mut for_key = true;
        let mut key = Vec::<u8>::new();
        let mut value = Vec::<u8>::new();
        let mut cookies = HashMap::new();
        for byte in bytes {
            match *byte {
                32 => continue,
                59 => {
                    for_key = true;
                    cookies.insert(
                        String::from_utf8(key.clone()).unwrap_or(String::new()),
                        String::from_utf8(value.clone()).unwrap_or(String::new())
                    );
                    key.clear();
                    value.clear();
                    continue;
                },
                61 => {
                    for_key = false;
                    continue;
                },
                _ => {
                    if for_key {
                        key.push(*byte);
                    } else {
                        value.push(*byte);
                    }
                }
            };
        }
        if !key.is_empty() && !value.is_empty() {
            cookies.insert(
                String::from_utf8(key).unwrap_or(String::new()),
                String::from_utf8(value).unwrap_or(String::new())
            );
        }
        cookies
    }

    pub fn refresh(&mut self) {
        let Some(ref document) = self.document else { return };
        let Ok(cookies) = document.cookie() else { return };
        self.cookies = Self::bin_cookies(cookies.as_bytes());
    }

    pub fn get_length( &self ) -> usize {
        self.cookies.len()
    }

    pub fn get_cookies( &self ) -> Array {
        let cookies = Array::new();
        for cookie in self.cookies.clone().into_iter() {
            let cook = Array::new();
            cook.set( 0, Into::<JsValue>::into( cookie.0 ) );
            cook.set( 1, Into::<JsValue>::into( cookie.1 ) );
            cookies.push( &cook );
        }
        cookies
    }

    fn u32_to_string( &self, number: u32 ) -> String {
        let mut _data = String::new();
        if number < 10 {
            _data = format!( "0{}", number );
        } else {
            _data = number.to_string();
        }
        _data
    }

    pub fn push(
        &mut self,
        name: String,
        value: String,
        path: Option<String>,
        domain: Option<String>,
        max_age: Option<u32>,
        expires: Option<Date>,
        sanesite: Option<String>
    ) {
        let Some(document) = self.document.clone() else { return };
        let mut m = String::new();
        if let Some( max_age ) = max_age {
            m = format!("; max-age={}", max_age);
        } else {
            if let Some( expires ) = expires {
                m = format!(
                    "; expires={}, {} {} {} {}:{}:{} UTC",
                    get_days()[ expires.get_day() as usize ],
                    self.u32_to_string( expires.get_date() ),
                    get_months()[ expires.get_month() as usize ],
                    expires.get_full_year(),
                    self.u32_to_string( expires.get_hours() ),
                    self.u32_to_string( expires.get_minutes() ),
                    self.u32_to_string( expires.get_seconds() )
                );
            }
        }
        let result = document.set_cookie(format!(
            "{}={}; path={}; domain={}{}; sanesite={}",
            name,
            value,
            path.unwrap_or( String::from( '/' ) ),
            domain.unwrap_or( self.url.clone() ),
            m,
            sanesite.unwrap_or( "lax".to_owned() )
        ).as_str() );
        if let Err( error ) = result {
            error_1(&error);
        }
        self.cookies.insert( name, value );
    }

    pub fn delete(
        &mut self,
        name: String,
        value: String,
        path: Option<String>,
        domain: Option<String> )
    {
        let Some(document) = self.document.clone() else { return };
        let result = document.set_cookie( format!(
            "{}={}; path={}; domain={}; expires=Thu, 01 Jan 1970 00:00:00 UTC",
            name,
            value,
            path.unwrap_or( String::from( '/' ) ),
            domain.unwrap_or( self.url.clone() )
        ).as_str() );
        if let Err( error ) = result {
            error_1(&error);
        }
        self.cookies.remove( &name );
    }

    pub fn get( &self, name: String ) -> JsString {
        JsString::from( self.cookies.get( &name ).unwrap_or( &String::new() ).as_str() )
    }

    pub fn has( &self, name: String ) -> Boolean {
        Boolean::from( self.cookies.contains_key( &name ) )
    }
}