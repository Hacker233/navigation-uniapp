import request from '../index.js'
// 查询tabbar
export const getTabbar = () => {
  return request({
    url: "/api/tabbar/getTabbar",
    method: "get",
  });
};