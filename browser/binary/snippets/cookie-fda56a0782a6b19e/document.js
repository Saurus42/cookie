export function getCookie() {
  return document.cookie;
}

export function getDomain() {
  return location.hostname;
}

export function addRemoveCookie( cookie ) {
  document.cookie = cookie;
}