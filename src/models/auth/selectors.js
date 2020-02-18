export const csrfToken = () => localStorage.getItem('csrfToken');
export const accessToken = () => localStorage.getItem('accessToken');
export const expiresAt = () => Number(localStorage.getItem('expiresAt'));
export const isAuthorized = () => Boolean(accessToken());
export const timeToTokenExpiration = () => expiresAt() - Date.now();
export const needToRefreshTokens = () => timeToTokenExpiration() < 10000;
// refresh tokens at 10 seconds before it will be expired
