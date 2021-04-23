class Cookie {
    constructor() {
        this.#month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        this.#day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.#url = window.location.hostname;
        this.#cookies = new Map();
        const cookies = document.cookie.split('; ');
        for (const cookie of cookies) {
            const data = cookie.split('=');
            this.#cookies.set(data[0], data[1]);
        }
    }
    #day;
    #month;
    #url;
    get url() {
        return this.#url;
    }
    set url(v) {
        if (typeof v !== 'string') {
            console.log(new Error('Error type.'));
            return;
        }
        const regex = new RegExp(/.*\..*/);
        if (!regex.test(v)) {
            console.log('The domain name is incorrect.');
            return;
        }
        this.#url = v;
    }
    #cookies;
    get cookies() {
        const cookies = [];
        for (const [key, value] of this.#cookies) {
            cookies.push([key, value]);
        }
        return cookies;
    }
    set cookies(v) {
        console.log(new Error('Cookies cannot be added this way.'));
    }
    get length() {
        return this.#cookies.size;
    }
    /**
     * Adding and updating cookies.
     * @param {string} name name cookie
     * @param {string} value value cookie
     * @param {string} path path cookie
     * @param {string} domain domain cookie
     * @param {string|number} maxAge max age cookie in miliseconds
     * @param {Date} expires the expiry date of the cookie
     * @param {string} samesite using cookies on other websites
     * @returns {void}
     */
    push(name, value, path, domain, maxAge, expires, samesite) {
        document.cookie = `${name}=${value}; ${path ? path : '/'}; domain=${domain ? domain : this.#url}${maxAge ? `; max-age=${maxAge}` : ''}${expires ? `; expires=${`${this.#day[expires.getDay()]}, ${expires.getDate() < 10 ? `0${expires.getDate()}` : expires.getDate()} ${this.#month[expires.getMonth()]} ${expires.getFullYear()} ${expires.getHours() < 10 ? `0${expires.getHours()}` : expires.getHours()}:${expires.getMinutes() < 10 ? `0${expires.getMinutes()}` : expires.getMinutes()}:${expires.getSeconds() < 10 ? `0${expires.getSeconds()}` : expires.getSeconds()} UTC`}` : ''}; sanesite=${samesite ? samesite : 'lax'}`;
        this.#cookies.set(name, value);
    }
    /**
     * Deleting cookies.
     * @param {string} name name cookie
     * @param {string} value value cookie
     * @param {string} path path cookie
     * @param {string} domain domain cookie
     * @returns {void}
     */
    delete(name, value, path, domain) {
        document.cookie = `${name}=${value}; path=${path ? path : '/'}; domain=${domain ? domain : this.#url}; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
        this.#cookies.delete(name);
    }
    /**
     * Get cookies from the collection.
     * @param {string} name name cookie
     * @returns {string|null}
     */
    get(name) {
        if (this.#cookies.has(name))
            return this.#cookies.get(name);
        else
            return null;
    }
    /**
     * Checks if the cookie exists.
     * @param {string} name name cookie
     * @returns {boolean}
     */
    has(name) {
        return this.#cookies.has(name);
    }
}
export default Cookie;
