import axios from 'axios';
// const baseURL = `http://localhost:3000`;
axios.defaults.baseURL = `http://localhost:3000`;

// 获取商品信息接口
// export const getStoreinfo = () => axios.get(`${baseURL}/api/seller`);
export const getStoreinfo = () => axios.get(`/api/seller`);

// 获取商品列表
export const getGoodslist = () => axios.get(`/api/goods`);
