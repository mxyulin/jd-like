import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
  let uuid_token = localStorage.getItem('uuid_token');
  // 如果没有
  if (!uuid_token) {
    // 没有就新生成一个
    uuid_token = uuidv4();
    // 写入 localStorage 长期保存
    localStorage.setItem('uuid_token', uuid_token);
  }
  return uuid_token;
}
