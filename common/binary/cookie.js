let imports = {};
imports['__wbindgen_placeholder__'] = module.exports;
let wasm;
const { getCookie, addRemoveCookie, getDomain } = require(String.raw`./snippets/cookie-fda56a0782a6b19e/document.js`);
const { TextDecoder, TextEncoder } = require(`util`);

const heap = new Array(32).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

let cachedTextEncoder = new TextEncoder('utf-8');

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length);
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len);

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3);
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}
/**
*/
class Cookie {

    static __wrap(ptr) {
        const obj = Object.create(Cookie.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cookie_free(ptr);
    }
    /**
    * @param {string} name
    * @param {string} value
    * @param {string | undefined} path
    * @param {string | undefined} domain
    * @param {number | undefined} max_age
    * @param {Date | undefined} expires
    * @param {string | undefined} sanesite
    */
    push(name, value, path, domain, max_age, expires, sanesite) {
        var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(path) ? 0 : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(domain) ? 0 : passStringToWasm0(domain, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = isLikeNone(sanesite) ? 0 : passStringToWasm0(sanesite, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len4 = WASM_VECTOR_LEN;
        wasm.cookie_push(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, !isLikeNone(max_age), isLikeNone(max_age) ? 0 : max_age, isLikeNone(expires) ? 0 : addHeapObject(expires), ptr4, len4);
    }
    /**
    * @param {string} name
    * @param {string} value
    * @param {string | undefined} path
    * @param {string | undefined} domain
    */
    delete(name, value, path, domain) {
        var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passStringToWasm0(value, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = isLikeNone(path) ? 0 : passStringToWasm0(path, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = isLikeNone(domain) ? 0 : passStringToWasm0(domain, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len3 = WASM_VECTOR_LEN;
        wasm.cookie_delete(this.ptr, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3);
    }
    /**
    * @param {string} name
    * @returns {string}
    */
    get(name) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            var len0 = WASM_VECTOR_LEN;
            wasm.cookie_get(retptr, this.ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(r0, r1);
        }
    }
    /**
    * @returns {Array<any>}
    */
    get cookies() {
        var ret = wasm.cookie_cookies(this.ptr);
        return takeObject(ret);
    }
    /**
    * @returns {number}
    */
    get length() {
        var ret = wasm.cookie_length(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {string} name
    * @returns {boolean}
    */
    has(name) {
        var ptr0 = passStringToWasm0(name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len0 = WASM_VECTOR_LEN;
        var ret = wasm.cookie_has(this.ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
    */
    constructor() {
        var ret = wasm.cookie_new();
        return Cookie.__wrap(ret);
    }
}
module.exports.Cookie = Cookie;

module.exports.__wbg_getDomain_b7c0e295807ebc89 = function(arg0) {
    var ret = getDomain();
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

module.exports.__wbg_addRemoveCookie_cf18aee6c3f7ae60 = function(arg0, arg1) {
    try {
        addRemoveCookie(getStringFromWasm0(arg0, arg1));
    } finally {
        wasm.__wbindgen_free(arg0, arg1);
    }
};

module.exports.__wbindgen_string_new = function(arg0, arg1) {
    var ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
};

module.exports.__wbg_getCookie_5ced3406d24d2758 = function(arg0) {
    var ret = getCookie();
    var ptr0 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
};

module.exports.__wbg_new_16f24b0728c5e67b = function() {
    var ret = new Array();
    return addHeapObject(ret);
};

module.exports.__wbg_push_a72df856079e6930 = function(arg0, arg1) {
    var ret = getObject(arg0).push(getObject(arg1));
    return ret;
};

module.exports.__wbg_getUTCDate_55257fc1fc289fe1 = function(arg0) {
    var ret = getObject(arg0).getUTCDate();
    return ret;
};

module.exports.__wbg_getUTCDay_1273a57ccfd833e6 = function(arg0) {
    var ret = getObject(arg0).getUTCDay();
    return ret;
};

module.exports.__wbg_getUTCFullYear_ac803d30c74c4ae5 = function(arg0) {
    var ret = getObject(arg0).getUTCFullYear();
    return ret;
};

module.exports.__wbg_getUTCHours_02c89df88ffb68db = function(arg0) {
    var ret = getObject(arg0).getUTCHours();
    return ret;
};

module.exports.__wbg_getUTCMinutes_d5bb828e368f7f74 = function(arg0) {
    var ret = getObject(arg0).getUTCMinutes();
    return ret;
};

module.exports.__wbg_getUTCMonth_8b342516cb9b0874 = function(arg0) {
    var ret = getObject(arg0).getUTCMonth();
    return ret;
};

module.exports.__wbg_getUTCSeconds_a27aa033ba9580bd = function(arg0) {
    var ret = getObject(arg0).getUTCSeconds();
    return ret;
};

module.exports.__wbg_new0_57a6a2c2aaed3fc5 = function() {
    var ret = new Date();
    return addHeapObject(ret);
};

module.exports.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

const path = require('path').join(__dirname, 'cookie_bg.wasm');
const bytes = require('fs').readFileSync(path);

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
wasm = wasmInstance.exports;
module.exports.__wasm = wasm;

