import * as actions from '../action';

//登入
const login = {
  login: false,
  phone: '',
  passWord: '',
  random:null
};

export const loginReducer = (state = login, action) => {
  switch (action.type) {
    case actions.LOGIN:
      return action.payload;
    default:
      return state;
  }
};

//註冊
const register = {
  phone: '',
  name: '',
  Fname: '',
  password: '',
  again_password: '',
  email: '',
  pid: ''
};

export const userRegisterReducer = (state = register, action) => {
  switch (action.type) {
    case actions.REGISTER:
      return action.payload;
    default:
      return state;
  }
};

// 個人資訊
const userinfo = {
  name: '登入帳戶',
  Fname: '',
  email: '',
  phone: '',
  pid: '',
  status:''
};

export const userInfoReducer = (state = userinfo, action) => {
  switch (action.type) {
    case actions.USERINFO:
      return action.payload;
    default:
      return state;
  }
};

//QRcode
const userConfirmPwd = {
  code1: '',
  code2: '',
  code3: '',
  code4: '',
};

export const userConfirmPwdReducer = (state = userConfirmPwd, action) => {
  switch (action.type) {
    case actions.CONFIRMCODE:
      return action.payload;
    default:
      return state;
  }
};

//更改密碼暫存
const userPassword = {
  oldPassword: '',
  newPassword1: '',
  newPassword2: '',
};

export const userPasswordReducer = (state = userPassword, action) => {
  switch (action.type) {
    case actions.USERPASSWORD:
      return action.payload;
    default:
      return state;
  }
};

//新增車牌
const userAddLP = {
  LPpicker: '',
  LPcheckBox1: '',
  LPcheckBox2: '',
  LPNickname: '',
  LPNo1: '',
  LPNo2: '',
  DType: null,
  add: false,
};

export const userAddLPReducer = (state = userAddLP, action) => {
  switch (action.type) {
    case actions.USERADDLP:
      return action.payload;
    default:
      return state;
  }
};

//修改車牌
const userModifyLP = {
  ModifyLP: false,
};

export const userModifyLPReducer = (state = userModifyLP, action) => {
  switch (action.type) {
    case actions.USERMODIFYLP:
      return action.payload;
    default:
      return state;
  }
};

// 預設車牌
const userSelectLP = {
  selectLP: '',
  LPNickname:'',
  LPType:''
};

export const userSelectLPReducer = (state = userSelectLP, action) => {
  switch (action.type) {
    case actions.USERSELECTLP:
      return action.payload;
    default:
      return state;
  }
};

//更新車牌列表
const userUpdateLP={
  updateLP:false
}
export const userUpdateLPReducer = (state = userUpdateLP, action) => {
  switch (action.type) {
    case actions.USERUPDATELP:
      return action.payload;
    default:
      return state;
  }
};

//更新繳費記錄
const userUpdateList={
  updateList:false
}
export const userUpdateListReducer = (state = userUpdateList, action) => {
  switch (action.type) {
    case actions.USERUPDATELIST:
      return action.payload;
    default:
      return state;
  }
};
// loading
const userLoading={
  loading:false
}
export const userLoadingReducer = (state = userLoading, action) => {
  switch (action.type) {
    case actions.USERULOADING:
      return action.payload;
    default:
      return state;
  }
};
