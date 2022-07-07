'use strict';
const {
	verifyToken
} = require("wx-common");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const db = uniCloud.database();
	const dbCmd = db.command;

	const action = event.action;
	const payload = verifyToken(event.token);
	console.log(action)
	console.log('payload====',payload)
	
	const now = new Date().getTime();
	// db.collection("books").update({store:0})

	let dbRes;
	if (action == "add") {
		const bookInfo = await db.collection("isbnlib").doc(event.isbnid).get();

		dbRes = await db.collection("books").add({
			owner: payload.openid,
			title: bookInfo.data[0].title,
			cover_url: bookInfo.data[0].cover_url,
			isbn: bookInfo.data[0].isbn,
			rating:{
				star_count: bookInfo.data[0].rating.star_count,
				value: bookInfo.data[0].rating.value,
			},
			isbnid: event.isbnid,
			lendout: 0,
			createtime: now,
			updatetime: now
		})
		
		return dbRes;
	}else if(action == "listbyshelf"){
		if(event.searchLabel){
			dbRes = await db.collection("books").field({owner:false}).where({
				owner: dbCmd.eq(payload.openid),
				title: new RegExp(event.searchLabel)
			}).get();
		}else{
			dbRes = await db.collection("books").field({owner:false}).where({
				owner: dbCmd.eq(payload.openid)
			}).get();
		}
		return dbRes
	}else if(action == "listAll"){
		if(event.searchLabel){
			dbRes = await db.collection("books").field({owner:false}).where({
				title: new RegExp(event.searchLabel)
			}).get();
			
		}else{
			dbRes = await db.collection("books").field({owner:false}).get();
			// const $ = db.command.aggregate;
			// dbRes = await db.collection("books").aggregate().group({
			// 	"_id":"$isbnid",
			// 	"isbnid": $.last("$isbnid"),
			// 	"title": $.last("$title"),
			// 	"cover_url": $.last("$cover_url")
			// }).sort({
			// 	"_id":-1
			// }).end();
		}
		return dbRes
	}else if(action == 'getBookDetail'){
		let bookInfo = await db.collection('books').where({
			_id: event.id
		}).get()
		let data = bookInfo.data[0]
		let bookInfoForISBN = await db.collection('isbnlib').field({abstract:true}).where({
			isbn: data.isbn
		}).get()
		let bookInfoForUser = await db.collection('users').field({openid:false}).where({
			openid: data.owner
		}).get()
		let bookSelf = 0
		if(data.owner == payload.openid){
			bookSelf = 1
		}
		dbRes = {
			...data,
			bookSelf: bookSelf,
			abstract: bookInfoForISBN.data[0].abstract,
			user: bookInfoForUser.data[0]
		}
		
		return dbRes
	}else if(action == 'changeStore'){
		db.collection("books").doc(event.id).update({store:event.store})
	}


	//返回数据给客户端
	return event
};
