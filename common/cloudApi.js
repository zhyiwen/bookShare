let token;


function call(option){
	return new Promise((resolve,reject)=>{
		// token=localStorage.getItem('jwt')
		token = uni.getStorageSync('jwt');
		if(!option.data)option.data={};
		if(token)option.data.token = token;
		uni.showLoading();
		uniCloud.callFunction({
			name:option.name,
			data:option.data,
			success:(res)=>{
				if(res.result&&res.result.token)token = res.result.token;
				if(option.success)option.success(res);
				resolve(res);
			},
			fail:(err)=>{
				if(option.fail)option.fail(err);
				// uni.showModal({
				// 	title:"错误",
				// 	content:JSON.stringify(err.errMsg)
				// })
				reject(err);
			},
			complete:()=>{
				uni.hideLoading();
				if(option.complete)option.complete();
			}
		});
	});
}

module.exports = {
	call:call
}