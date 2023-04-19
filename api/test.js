// 用于测试 pc 端 与 移动端 的数据接口

export default (obj) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `https://h5.biyao.com/api${obj.url}`,
			method:obj.method || 'GET',
			data: JSON.stringify(obj.data),
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}