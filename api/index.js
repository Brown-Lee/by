const BASE_URL = 'http://47.113.230.184:9527'
export default (obj) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `${BASE_URL}/api${obj.url}`,
      method: obj.method || "GET",
      data: obj.data,
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
