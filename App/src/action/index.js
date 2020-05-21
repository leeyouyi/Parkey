// 登入
export const LOGIN = 'LOGIN';
export const login = (login, phone, password,random) => ({
  type: LOGIN,
  payload: {
    login: login,
    phone: phone,
    password: password,
    random:random
  },
});
// 會員資訊
export const USERINFO = 'USERINFO';
export const userinfo = (name, Fname, phone, email, pid, status) => ({
  type: USERINFO,
  payload: {
    name,
    Fname,
    phone,
    email,
    pid,
    status
  }
});
// 註冊
export const REGISTER = 'REGISTER';
export const register = (
  phone,
  name,
  Fname,
  password,
  again_password,
  email,
  pid,
) => ({
  type: REGISTER,
  payload: {
    phone,
    name,
    Fname,
    password,
    again_password,
    email,
    pid,
  },
});
// 驗證碼
export const CONFIRMCODE = 'CONFIRMCODE';
export const userConfirmPwd = (code1, code2, code3, code4) => ({
  type: CONFIRMCODE,
  payload: {
    code1,
    code2,
    code3,
    code4,
  },
});
// 修改密碼
export const USERPASSWORD = 'USERPASSWORD';
export const userPassword = (oldPassword, newPassword1, newPassword2) => ({
  type: USERPASSWORD,
  payload: {
    oldPassword,
    newPassword1,
    newPassword2,
  },
});
// 新增車牌
export const USERADDLP = 'USERADDLP';
export const userAddLP = (
  LPpicker,
  LPcheckBox1,
  LPcheckBox2,
  LPNickname,
  LPNo1,
  LPNo2,
  DType,
  add,
) => ({
  type: USERADDLP,
  payload: {
    LPpicker,
    LPcheckBox1,
    LPcheckBox2,
    LPNickname,
    LPNo1,
    LPNo2,
    DType,
    add,
  },
});
// 修改車牌
export const USERMODIFYLP = 'USERMODIFYLP';
export const userModifyLP = ModifyLP => ({
  type: USERMODIFYLP,
  payload: {
    ModifyLP
  },
});

// 預設車牌
export const USERSELECTLP = 'USERSELECTLP';
export const userSelectLP = (selectLP,LPNickname,LPType) => ({
  type: USERSELECTLP,
  payload: {
    selectLP,
    LPNickname,
    LPType
  },
});

// 更新車牌列表
export const USERUPDATELP = 'USERUPDATELP';
export const userUpdateLP = (updateLP) => ({
  type: USERUPDATELP,
  payload: {
    updateLP
  }
});

// 更新繳費記錄
export const USERUPDATELIST = 'USERUPDATELIST';
export const userUpdateList = (updateList) => ({
  type: USERUPDATELIST,
  payload: {
    updateList
  }
});

// loading
export const USERULOADING = 'USERULOADING';
export const userLoading = (loading) => ({
  type: USERULOADING,
  payload: {
    loading
  }
});