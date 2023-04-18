// import axios from 'axios'
// const BASE_URL = 'http://47.113.230.184:9527'
// const service = axios.create({
// 	baseURL: BASE_URL,
// 	timeout: 5000
// })
// service.interceptors.request.use(config => config)
// service.interceptors.response.use(response => response)
// export default service;

export default (obj) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: `http://47.113.230.184:9527/api${obj.url}`,
			method:obj.method || 'GET',
			header:{
				UserAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/112.0"
			},
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