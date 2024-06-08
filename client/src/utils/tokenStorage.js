import Cookies from 'js-cookie';

export function setAccessToken(token) {
  Cookies.set("accessToken", token, {secure:true, sameSite: 'Strict' });
}

export function getAccessToken() {
  return Cookies.get("accessToken");
}

export function removeAccessToken() {
    Cookies.remove("accessToken");
    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}