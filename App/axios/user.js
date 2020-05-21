import qs from 'qs';
import {api} from './base';

export const time = ()=>{
        let date = new Date();
        let year = date.getFullYear() ;
        let month = date.getMonth() + 1 ;
        let day = date.getDate() ;
        let hour = date.getHours() ;
        let minute = date.getMinutes() ;
        let second = date.getSeconds() ;
        let milliseconds = date.getMilliseconds() ;
        if(month <10) month = '0' + month
        if(day <10) day = '0' + day
        if(hour <10) hour = '0' + hour
        if(minute <10) minute = '0' + minute
        if(second <10) second = '0' + second
        let now = '' + year + month + day + hour + minute + second + milliseconds
        return  now
  }
// 登入
export const userLogin = params => {
  return api.post('Login', qs.stringify(params));
};

// 登出
export const userLogout = params => {
  return api.post('Logout', qs.stringify(params));
};

// 註冊
export const userRegister = params => {
  return api.post('Register', qs.stringify(params));
};

// 驗證
export const userConfirmPwd = params => {
  return api.post('ConfirmPwd', qs.stringify(params));
};

// 重發驗證
export const userResendConfirm = params => {
  return api.post('ResendConfirm', qs.stringify(params));
};

// 取得會員資料
export const userQMemberInfo = params => {
  return api.post('QMemberInfo', qs.stringify(params));
};

// 更新會員資料
export const userUMemberInfo = params => {
  return api.post('UMemberInfo', qs.stringify(params));
};

// 更新會員密碼
export const userUPassword= params => {
  return api.post('UPassword', qs.stringify(params));
};

// 取得新密碼
export const userRPassword_2= params => {
  return api.post('RPassword_2', qs.stringify(params));
};

// 新增車牌
export const userGetAddLP= params => {
  return api.post('AddLP', qs.stringify(params));
};

// 取得車牌
export const userQLPList= params => {
  return api.post('QLPList', qs.stringify(params));
};

// 刪除車牌
export const userDeleteLP= params => {
  return api.post('DeleteLP', qs.stringify(params));
};

// 修改車牌
export const userModifyLP= params => {
  return api.post('ModifyLP', qs.stringify(params));
};

// 查詢綁定設備 
export const userQBoundDevices= params => {
  return api.post('QBoundDevices', qs.stringify(params));
};
// 綁定車架設備 
export const userBindDevice= params => {
  return api.post('BindDevice', qs.stringify(params));
};
// 解鎖車架設備
export const userUnlockDevice= params => {
  return api.post('UnlockDevice', qs.stringify(params));
};
// 車位詳細資訊 
export const userQDevice= params => {
  return api.post('QDevice', qs.stringify(params));
};
// 鎖定車位查詢
export const userQLockedDevice= params => {
  return api.post('QLockedDevice', qs.stringify(params));
};
// 取得地圖點位
export const userQMapPinList= params => {
  return api.post('QMapPinList', qs.stringify(params));
};
// 取得車位資訊
export const userQMapPin= params => {
  return api.post('QMapPin', qs.stringify(params));
};
// 查詢停車單
export const userQTickets= params => {
  return api.post('QTickets', qs.stringify(params));
};
// 確認繳費
export const userPayTicket= params => {
  return api.post('PayTicket', qs.stringify(params));
};
// 推播資訊
export const userQInfo= params => {
  return api.post('QInfo', qs.stringify(params));
};