import axios from "axios";

const accessToken = document.cookie.split("=")[1];

const api = axios.create({
  baseURL: "http://52.79.144.138",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json,",
    authorization: `${accessToken ? accessToken : null} `,
  },
});

export const apis = {
  setUser: () =>
    api.get(`/api/user/myInfos`, {
      headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json,",
        authorization: accessToken,
      },
    }),
  signup: (infoObj) => api.post(`auth/signup`, infoObj),
  login: (infoObj) => api.post(`auth/login`, infoObj),
  like: (openingId) => api.post(`api/openings/${openingId}/like`),
  dislike: (openingId) => api.put(`api/openings/${openingId}/like`),
  getJobgroups: () => api.get("/api/job-groups"),
  getTags: () => api.get("/api/tag-categories"),
  getSecondTags: (tagCategoryId) => api.get(`/api/tags/${tagCategoryId}`),
  getAllOpenings: () => api.get("/api/openings"),
  getJobGroupOpenings: (jobgroupId) => api.get(`/api/jobgroup/${jobgroupId}`),
  getTagResults: (tagName) =>
    api.get(`/api/search`, {
      params: {
        tagName,
      },
    }),
  getCareerResults: (career) =>
    api.get(`/api/career/`, {
      params: {
        career,
      },
    }),
  getOpeningDetail: (openingId) => api.get(`/api/openings/${openingId}`),
  getRecommendedOpenings: () => api.get("/api/recommend"),
};
