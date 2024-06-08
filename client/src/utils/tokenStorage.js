import Cookies from 'js-cookie';

// Function to set the access token in a cookie
export function setAccessToken(token) {
  Cookies.set("accessToken", token, { secure: true, sameSite: 'Strict' });
}

// Function to get the access token from the cookie
export function getAccessToken() {
  return Cookies.get("accessToken");
}

// Function to remove the access token and refresh token cookies
export function removeAccessToken() {
  Cookies.remove("accessToken");  // Remove access token cookie
  document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";  // Remove refresh token cookie from document cookie
}
