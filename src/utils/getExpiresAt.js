const getMilliseconds = seconds => seconds * 1000;
const getExpiresAt = expiresIn => getMilliseconds(expiresIn) + Date.now();
export default getExpiresAt;
