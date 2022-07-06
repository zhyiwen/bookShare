const jwt = require("jsonwebtoken")
const appId = "wx14b7454a0be5531a";
const appSecret = "b6989d1ca5ee09b0675176ce7a6592d7";

const db = uniCloud.database();

function getToken(openid) {
	return jwt.sign({
		openid: openid
	}, appSecret, {
		expiresIn: 60 * 60 * 24
	});
}

function verifyToken(token) {
	return jwt.verify(token, appSecret);
}

module.exports = {
	appId: appId,
	appSecret: appSecret,
	getToken: getToken,
	verifyToken: verifyToken
}
