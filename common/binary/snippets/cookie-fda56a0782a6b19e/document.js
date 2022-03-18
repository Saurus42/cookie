export function getCookie() {
  return document.cookie;
}

export function getDomain() {
  return document.domain;
}

export function addRemoveCookie( cookie ) {
  document.cookie = cookie;
}