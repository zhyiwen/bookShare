'use strict';
const {
	verifyToken
} = require("wx-common");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const {
		userInfo,
		token
	} = event;
	const db = uniCloud.database();
	const dbCmd = db.command;

	const payload = verifyToken(token);
	console.log(payload);
	let dbRes;
	if(event.action=='getUser'){
		dbRes = await db.collection("users").field({openid:false}).where({
			openid: payload.openid
		}).get();
		console.log("get======",dbRes)
		return dbRes.data[0]
	}else if(event.action =='updateUser'){
		// 对一个数据项进行更新
		dbRes = await db.collection("users").where({
			openid: dbCmd.eq(payload.openid)
		}).update(event.userInfo)
		//返回数据给客户端
		return dbRes.data
	}
	return event
};
