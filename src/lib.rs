use std::collections::HashMap;
use js_sys::{Array, Date, JsString, Boolean};
use wasm_bindgen::prelude::*;
use web_sys::{window, HtmlDocument};

#[wasm_bindgen]
pub struct Cookie {
    day: Vec<String>,
    month: Vec<String>,
    cookies: HashMap<String, String>,
    url: String,
    document: HtmlDocument
}

#[wasm_bindgen]
impl Cookie {
    #[wasm_bindgen( constructor )]
    pub fn new() -> Self {
        let document_html = window().unwrap().document().unwrap().dyn_into::<HtmlDocument>().unwrap();
        let location = document_html.location().expect( "Error Location" );
        let cook = document_html.cookie().unwrap();
        let cookies_string = cook.split( "; " ).collect::<Vec<&str>>();
        let mut cookies = HashMap::new();
        for cookie in cookies_string {
            let data = cookie.split( "=" ).collect::<Vec<&str>>();
            if data.len() == 2 {
                cookies.insert( data[0].to_owned(), data[1].to_owned() );
            }
        }
        Cookie {
            month: vec![ "Jan".to_owned(), "Feb".to_owned(), "Mar".to_owned(), "Apr".to_owned(), "May".to_owned(), "Jun".to_owned(), "Jul".to_owned(), "Aug".to_owned(), "Sep".to_owned(), "Oct".to_owned(), "Nov".to_owned(), "Dec".to_owned() ],
            day: vec![ "Sun".to_owned(), "Mon".to_owned(), "Tue".to_owned(), "Wed".to_owned(), "Thu".to_owned(), "Fri".to_owned(), "Sat".to_owned() ],
            cookies,
            url: location.hostname().unwrap(),
            document: document_html
        }
    }

    #[wasm_bindgen( getter )]
    pub fn length( &self ) -> usize {
        self.cookies.len()
    }

    // #[wasm_bindgen( setter )]
    // pub fn set_length( &self, _val: u32 ) {
    //     utils::set_panic_hook();
    // }

    #[wasm_bindgen( getter )]
    pub fn cookies( &self ) -> Array {
        let cookies = Array::new();
        for cookie in self.cookies.clone().into_iter() {
            let cook = Array::new();
            cook.set( 0, Into::<JsValue>::into( cookie.0 ) );
            cook.set( 1, Into::<JsValue>::into( cookie.1 ) );
            cookies.push( &cook );
        }
        cookies
    }

    // #[wasm_bindgen( setter )]
    // pub fn set_cookies( &self, _val: Array ) {
    //     utils::set_panic_hook();
    // }

    fn u32_to_string( &self, number: u32 ) -> String {
        let mut _data = String::new();
        if number < 10 {
            _data = format!( "0{}", number );
        } else {
            _data = number.to_string();
        }
        _data
    }

    pub fn push( &mut self, name: String, value: String, path: Option<String>, domain: Option<String>, max_age: Option<u32>, expires: Option<Date>, sanesite: Option<String> ) {
        let mut m = String::new();
        if let Some( max_age ) = max_age {
            m = format!( "; max-age={}", max_age );
        } else {
            if let Some( expires ) = expires {
                m = format!( "; expires={}, {} {} {} {}:{}:{} UTC", self.day[ expires.get_day() as usize ].clone(), self.u32_to_string( expires.get_date() ), self.month[ expires.get_month() as usize ].clone(), expires.get_full_year(), self.u32_to_string( expires.get_hours() ), self.u32_to_string( expires.get_minutes() ), self.u32_to_string( expires.get_seconds() ) );
            }
        }
        let result = self.document.set_cookie( format!( "{}={}; path={}; domain={}{}; sanesite={}", name, value, path.unwrap_or( String::from( '/' ) ), domain.unwrap_or( self.url.clone() ), m, sanesite.unwrap_or( "lax".to_owned() ) ).as_str() );
        if let Err( error ) = result {
            panic!( "{:?}", error );
        }
        self.cookies.insert( name, value );
    }

    pub fn delete( &mut self, name: String, value: String, path: Option<String>, domain: Option<String> ) {
        let result = self.document.set_cookie( format!( "{}={}; path={}; domain={}; expires=Thu, 01 Jan 1970 00:00:00 UTC", name, value, path.unwrap_or( String::from( '/' ) ), domain.unwrap_or( self.url.clone() ) ).as_str() );
        if let Err( error ) = result {
            panic!( "{:?}", error );
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