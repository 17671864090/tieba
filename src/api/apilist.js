import {post , get} from './getapi'
export const login = data =>post('/api/admin/v1/signIn',data);
export const userinfo = data =>post('/api/admin/v1/userinfo',data);
export const Release = data =>post('/api/admin/v1/Release',data);
export const Topics = (data,query) =>get(`/api/admin/v1/topics${query}`,data);
export const TopicsItem = (data,query) =>get(`/api/admin/v1/topicsitem${query}`,data);
export const BuyPost = data =>post('/api/admin/v1/buyPost',data);
export const MemberBuy = data =>post('/api/admin/v1/MemberBuy',data);
export const Membertype = data =>post(`/api/admin/v1/Membertype`,data);
export const Userinformation = data =>post(`/api/admin/v1/Userinformation`,data); //用户信息



export const Withdrawalmoney = data =>post(`/api/v1/admin/Withdrawalmoney`,data); //提现
