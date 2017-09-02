import {REQUEST_NEWS, SET_NEWSOFFSET,
  RECEIVE_NEWS, RECEIVE_NEWS_ERROR,
  CLEAN_LIST,
} from '../constants';

const hrefPrefix = "http://bucssa.net/api/mobile/index.php?version=4&module=forumdisplay&fid=2&page="

export const setNewsOffset = (offset) => ({
  type: SET_NEWSOFFSET,
  payload: offset
});

export const receiveNews = json => {
  return {
      payload: json.Variables.forum_threadlist.map(thread => {
          return {
            tid: thread.tid,
            author: thread.author,
            postDate: thread.dateline,
            title: thread.subject,
          }
        }),
      type: RECEIVE_NEWS,
  }
};

export const requestNews = () => {
  return {
    type: REQUEST_NEWS,
  }
}

export const fetchNews = (current_page_index = 0) => dispatch => {
  dispatch(requestNews());
  fetch(hrefPrefix + (current_page_index + 1))
  .then(res => res.json())
  .then(
    json => {dispatch(receiveNews(json));},
    err => console.error(err)
  );
};

export const refreshNews = () => dispatch => {
  dispatch(requestNews());
  fetch(hrefPrefix + '0')
  .then(res => res.json())
  .then(
    json => {
      dispatch(
        {
          type: CLEAN_LIST,
        }
      );
      dispatch(receiveNews(json));
    },
    err => console.error(err)
  );
};
