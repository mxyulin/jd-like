import Mock from 'mockjs'

// 引入静态数据
import banner from './banner.json'
import floor from './floor.json'

// 第一个参数：请求地址，第二个参数：响应数据
// !一定要写 /mock 而不是 mock，不然 mock 拦截不到请求
Mock.mock('/mock/getBannerList', {code: 200, data: banner});
Mock.mock('/mock/getFloorList', {code: 200, data: floor});
