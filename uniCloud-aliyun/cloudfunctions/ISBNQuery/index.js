'use strict';
let doubanbook = require("doubanbook");
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const db = uniCloud.database();
	let {isbn} = event;
	
	let dbResult = await db.collection("isbnlib").limit(1).where({
		isbn:isbn
	}).get();
	if(dbResult.affectedDocs>0){
		return dbResult.data[0];
	}
	
	let res = await uniCloud.httpclient.request(
		"https://search.douban.com/book/subject_search?search_text="+isbn,
		{
			dataType:"text"
		}
	)
	
	let reg = /window\.__DATA__ = "(.*)"/;
	if(reg.test(res.data)){
		let bookdata = RegExp.$1;
		let data = doubanbook(bookdata)[0];
		
		let coverImage = await uniCloud.httpclient.request(
			data.cover_url
		);
		
		let uploadResult = await uniCloud.uploadFile({
			cloudPath: isbn + ".jpg",
			fileContent: coverImage.data
		})
		
		let resData = {
			isbn:isbn,
			title:data.title,
			rating:{
				star_count: data.rating.star_count,
				value: data.rating.value
			},
			cover_url: uploadResult.fileID, //图片的url
			abstract:data.abstract
		}
		
		dbResult = await db.collection("isbnlib").add(resData);
		resData["_id"] = dbResult["id"];

		return resData;
	}
	console.log(res)
	
	//返回数据给客户端
	return res
};
