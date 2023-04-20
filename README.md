# biyao.com 模拟必要商城

> 后端对接接口: [](https://h5.biyao.com/api)
> 前端对接接口: [](http://47.113.230.184:9527)

```
该数据由 必要商城 pc 端 提供，可在 api 中修改移动端地址
该项目已配置跨域功能
```

``` Makefile
登录  login
// 登录
/*
 *请求方式为：get
 *userName
 *password
 *响应内容{code:0,token:null}用户名或密码错误   {code:1,token:"fffsdfe",userName:"veb",userId:}成功返回token
 */


 注册  register
/*
 *请求方式为：get
 *userName
 *password
 *响应内容{code:0}被占用   {code:1}成功
 */



// 加入购物车
/*
 *请求方式为：get
 *goodId
 *token
 *响应内容{code:0}token无效   {code:1}添加成功 {code:2} 插入失败
*/
添加购物车 add
 goodId token


// 移除购物车商品  remove
/*
 *请求方式为：get
 *goodId
 *token
 *响应内容{code:0}token无效   {code:1}添加成功 {code:2} 插入失败
移除购物车每次移除一个到0的话就没法移除了但是还是会显示移除成功code==1



删除购物车商品  del 
/*
 *请求方式为：get
 *goodId
 *token
 *响应内容{code:0}token无效   {code:1}删除成功 {code:2} 删除失败   

以上孟哥的接口文档里有
！！！
获取商品列表  goodList
参数 type_one  缺省则获取所有分类列表
 *使用实例 /goodlist?type_one=男装  获取所有男装列表

请求单个商品  获取商品详情（商品介绍页面）detail
detail?goodId必传

热门商品 可以传分页  hotList
hotList?page=1

进店看看  supplierList
supplier 参数必传 可以传分页
supplierList?supplier=黛珂同原料制造商

同类商品  supplier 参数必传 没有分页
/sameList?supplier=黛珂同原料制造商

新品 newList（数据有限可以不传page）
newList

获取购物车列表
shopList （孟哥的接口文档里有）

获取一级分类     没参数
getTypeOne

获取二级分类  getTypeTwo
getTypeTwo?type_one=咖啡

获取二级商品列表  getTypeTwoList
getTypeTwoList?type_one=家具&type_two=沙发/椅

搜索接口  search
search?word=男装

热门商品  rmsp  （啥都不用传 10条数据）
```