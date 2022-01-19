import produce from "immer";
import { createAction, handleActions } from "redux-actions";
import { apis } from "../../shared/api";
import { userAddLike, userRemoveLike } from "./user";

// action type
const ADD_LIKE = "opening/ADD_LIKE";
const REMOVE_LIKE = "opening/REMOVE_LIKE";
const GET_JOBGROUPS = "opening/GET_JOBGROUPS";
const GET_TAGS = "opening/GET_TAGS";
const GET_SECOND_TAGS = "opening/GET_SECOND_TAGS";
const GET_ALL_OPENINGS = "opening/GET_ALL_OPENINGS";
const GET_JOBGROUP_OPENINGS = "opening/GET_JOBGROUP_OPENINGS";
const GET_TAG_RESULTS = "opening/GET_TAG_RESULTS";
const GET_CARRER_RESULTS = "opening/GET_CAREER_RESULTS";
const GET_OPENING_DETAIL = "opening/GET_OPENING_DETAIL";
const GET_RECOMMENDED_OPENINGS = "opening/GET_RECOMMENDED_OPENINGS";
const REMOVE_CURRENT_OPENING = "opening/REMOVE_CURRENT_OPENING";

// action creator
const addLike = createAction(ADD_LIKE, (openingId) => ({ openingId }));
const removeLike = createAction(REMOVE_LIKE, (openingId) => ({ openingId }));
const getJobgroups = createAction(GET_JOBGROUPS, (jobgroups) => ({
  jobgroups,
}));
const getTags = createAction(GET_TAGS, (tags) => ({ tags }));
const getSecondTags = createAction(GET_SECOND_TAGS, (secondTags) => ({
  secondTags,
}));
const getAllOpenings = createAction(GET_ALL_OPENINGS, (openings) => ({
  openings,
}));
const getJobgroupOpenings = createAction(GET_JOBGROUP_OPENINGS, (openings) => ({
  openings,
}));
const getTagResults = createAction(GET_TAG_RESULTS, (openings) => ({
  openings,
}));
const getCareerResults = createAction(GET_CARRER_RESULTS, (openings) => ({
  openings,
}));
const getOpeningDetail = createAction(GET_OPENING_DETAIL, (opening) => ({
  opening,
}));
const getRecommendedOpenings = createAction(
  GET_RECOMMENDED_OPENINGS,
  (openings) => ({ openings })
);
export const removeCurrentOpening = createAction(REMOVE_CURRENT_OPENING);

// initialState
const initialState = {
  jobGroups: [],
  tags: [],
  secondTag: [],
  openings: [],
  recommendedOpenings: [],
  currentOpening: {},
};

// thunk

export const toggleLikeDB =
  (openingId, isLike) =>
  (dispatch, getState, { history }) => {
    // 이미 좋아요 한 상태
    if (isLike === true) {
      apis
        .dislike(openingId)
        .then((res) => {
          dispatch(userRemoveLike(openingId));
          dispatch(removeLike(openingId));
        })
        .catch((err) => console.log("좋아요 취소가 반영되지 않았습니다.", err));
    } else if (isLike === false) {
      apis
        .like(openingId)
        .then((res) => {
          dispatch(userAddLike(openingId));
          dispatch(addLike(openingId));
        })
        .catch((err) => console.log("좋아요가 반영되지 않았습니다.", err));
    }
  };

export const getJobgroupsDB =
  () =>
  (dispatch, getState, { history }) => {
    apis
      .getJobgroups()
      .then((res) => {
        const { data: jobgroups } = res;
        dispatch(getJobgroups(jobgroups));
      })
      .catch((err) =>
        console.log("직무 그룹 리스트를 불러올 수 없습니다.", err)
      );
  };

export const getTagsDB =
  () =>
  (dispatch, getState, { history }) => {
    apis
      .getTags()
      .then((res) => dispatch(getTags(res.data)))
      .catch((err) => console.log("태그를 불러올 수 없습니다.", err));
  };

export const getSecondTagsDB =
  (tagId) =>
  (dispatch, getState, { history }) => {
    apis
      .getSecondTags(tagId)
      .then((res) => dispatch(getSecondTags(res.data)))
      .catch((err) => console.log("2차 태그를 불러올 수 없습니다.", err));
  };

export const getAllOpeningsDB =
  () =>
  (dispatch, getState, { history }) => {
    apis
      .getAllOpenings()
      .then((res) => {
        dispatch(getAllOpenings(res.data));
      })
      .catch((err) => console.log("공고 목록을 가져올 수 없습니다.", err));
  };

export const getJobgroupOpeningsDB =
  (jobGroupId) =>
  (dispatch, getState, { history }) => {
    apis
      .getJobGroupOpenings(jobGroupId)
      .then((res) => {
        dispatch(getJobgroupOpenings(res.data));
      })
      .catch((err) =>
        console.log("해당 직무의 공고 목록를 불러올 수 없습니다.", err)
      );
  };

export const getTagResultsDB =
  (tagName) =>
  (dispatch, getState, { history }) => {
    let name = tagName;
    if (tagName[tagName.length - 1] === "&") name.splice(-1, 1);

    apis
      .getTagResults(tagName)
      .then((res) => {
        dispatch(getTagResults(res.data));
      })
      .catch((err) => console.log("결과를 불러올 수 없습니다.", err));
  };

export const getOpeningDetailDB =
  (openingId) =>
  (dispatch, getState, { history }) => {
    apis
      .getOpeningDetail(openingId)
      .then((res) => {
        const { data } = res;
        dispatch(getOpeningDetail(data));
      })
      .catch((err) => console.log("공고 내용을 가져올 수 없습니다.", err));
  };

export const getRecommendedOpeningsDB =
  (openingId) =>
  (dispatch, getState, { history }) => {
    apis
      .getRecommendedOpenings(openingId)
      .then((res) => dispatch(getRecommendedOpenings(res.data)))
      .catch((err) => console.log("정보를 불러올 수 없습니다.".err));
  };

export const getCareerResultsDB =
  (career) =>
  (dispatch, getState, { history }) => {
    let upperCareer;
    if (career === "전체") {
      dispatch(getAllOpeningsDB());
      return;
    } else if (career === "신입") {
      upperCareer = "NEW_COMMER";
    } else if (career === "경력") {
      upperCareer = "CAREER";
    }
    apis
      .getCareerResults(upperCareer)
      .then((res) => {
        dispatch(getCareerResults(res.data));
      })
      .catch((err) => console.log("결과를 불러올 수 없습니다.", err));
  };

// reducer
export default handleActions(
  {
    [ADD_LIKE]: (state, action) =>
      produce(state, (draft) => {
        // 공고 리스트 반영
        draft.openings = draft.openings.map((opening) =>
          opening.openingId === action.payload.openingId
            ? { ...opening, likeCount: opening.likeCount + 1 }
            : opening
        );
        draft.currentOpening.openingId === action.payload.openingId &&
          draft.currentOpening.likeCnt++;
      }),
    [REMOVE_LIKE]: (state, action) =>
      produce(state, (draft) => {
        draft.openings = draft.openings.map((opening) =>
          opening.openingId === action.payload.openingId
            ? { ...opening, likeCount: opening.likeCount - 1 }
            : opening
        );
        draft.currentOpening.openingId === action.payload.openingId &&
          draft.currentOpening.likeCnt--;
      }),
    [GET_TAGS]: (state, action) =>
      produce(state, (draft) => {
        draft.tags = action.payload.tags;
      }),
    [GET_SECOND_TAGS]: (state, action) =>
      produce(state, (draft) => {
        draft.secondTag = action.payload.secondTags;
      }),
    [GET_JOBGROUPS]: (state, action) =>
      produce(state, (draft) => {
        draft.jobGroups = action.payload.jobgroups;
      }),
    [GET_ALL_OPENINGS]: (state, action) =>
      produce(state, (draft) => {
        draft.openings = action.payload.openings;
      }),
    [GET_JOBGROUP_OPENINGS]: (state, action) =>
      produce(state, (draft) => {
        draft.openings = action.payload.openings;
      }),
    [GET_TAG_RESULTS]: (state, action) =>
      produce(state, (draft) => {
        draft.openings = action.payload.openings;
      }),
    [GET_CARRER_RESULTS]: (state, action) =>
      produce(state, (draft) => {
        draft.openings = action.payload.openings;
      }),
    [GET_OPENING_DETAIL]: (state, action) =>
      produce(state, (draft) => {
        draft.currentOpening = action.payload.opening;
      }),
    [GET_RECOMMENDED_OPENINGS]: (state, action) =>
      produce(state, (draft) => {
        draft.recommendedOpenings = action.payload.openings;
      }),
    [REMOVE_CURRENT_OPENING]: (state, action) =>
      produce(state, (draft) => {
        draft.currentOpening = {};
      }),
  },
  initialState
);
