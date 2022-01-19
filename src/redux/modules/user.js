import axios from "axios";
import { apis } from "../../shared/api";
import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// action type
const SET_USER = "user/SET_USER";
const LOGOUT = "user/LOGOUT";
const ADD_LIKE = "user/ADD_LIKE";
const REMOVE_LIKE = "user/REMOVE_LIKE";

// action creator
const setUser = createAction(SET_USER, (user) => ({ user }));
const logout = createAction(LOGOUT);
export const userAddLike = createAction(ADD_LIKE, (openingId) => ({
  openingId,
}));
export const userRemoveLike = createAction(REMOVE_LIKE, (openingId) => ({
  openingId,
}));

// initialState
const initialState = {
  user: {
    name: "",
    email: "",
    likeIdList: [],
    likeList: [],
  },
  is_login: false,
};

//middleware actions
const setUserDB =
  () =>
  (dispatch, getState, { history }) => {
    apis
      .setUser()
      .then((res) => dispatch(setUser(res.data)))
      .catch((err) => console.log("유저 정보를 받아오지 못했습니다.", err));
  };

const loginDB =
  (infoObj) =>
  (dispatch, getState, { history }) => {
    apis
      .login(infoObj)
      .then((res) => {
        const accessToken = "Bearer " + res.data.accessToken;
        setCookie("isLogin", `${accessToken}`);
        dispatch(loginCheckDB());
      })
      .catch((err) => {
        alert("로그인에 실패했습니다.");
        console.log(err);
      });
  };

const logoutDB = () => {
  return function (dispatch, getState, { history }) {
    dispatch(logout());
    window.alert("로그아웃 되었습니다");
    history.replace("/");
  };
};

const signUpDB =
  (infoObj) =>
  (dispatch, getState, { history }) => {
    apis.signup(infoObj).catch((err) => {
      alert("회원가입에 실패했습니다.");
      console.log(err);
    });
  };

const loginCheckDB =
  () =>
  (dispatch, getState, { history }) => {
    const token = getCookie("isLogin");

    axios
      .get("http://52.79.144.138/api/user/myInfos", {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        const { openingApiResponses: likeList, ...rest } = res.data;
        const likeIdList = likeList.map((item) => item.openingId);
        dispatch(setUser({ likeList, likeIdList, ...rest }));
      })
      .catch((err) => console.log("회원 인증에 실패했습니다.", err));
  };

// reducer
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("isLogin");
        draft.user = {};
        draft.is_login = false;
      }),
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.user.likeIdList.push(action.payload.openingId);
      }),
    [REMOVE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.user.likeIdList = draft.user.likeIdList.map((item) => {
          console.log(item, action.payload.openingId);
          return item !== action.payload.openingId;
        });
      }),
  },
  initialState
);

const actionCreators = {
  logout,
  loginDB,
  logoutDB,
  signUpDB,
  loginCheckDB,
};

export { actionCreators };
