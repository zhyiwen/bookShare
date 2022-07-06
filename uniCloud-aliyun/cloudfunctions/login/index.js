'use strict';
const {
	appId,
	appSecret,
	getToken
} = require("wx-common");
exports.main = async (event, context) => {

	const db = uniCloud.database();

	const {
		code
	} = event;
	console.log(code)
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid=" + appId + "&secret=" + appSecret +
		"&js_code=" + code + "&grant_type=authorization_code", {
			dataType: "json"
		}
	)

	const openid = res.data.openid;
	const token = getToken(openid);
	let dbRes = await db.collection("users").where({
		openid: openid
	}).get();
	let userData;
	if (dbRes.affectedDocs <= 0) {
		userData = {
			openid: openid,
			nickName: "微信用户",
			avatarUrl: ""
		}
		await db.collection("users").add(userData)
	} else {
		userData = dbRes.data[0];
	}

	delete userData["openid"];
	userData["token"] = token;
	//返回数据给客户端
	return userData
};
