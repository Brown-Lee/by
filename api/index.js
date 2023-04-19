export default (obj) => {
  return new Promise((resolve, reject) => {
    uni.request({
      url: `http://47.113.230.184:9527/api${obj.url}`,
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
