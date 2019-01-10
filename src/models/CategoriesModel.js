import { getCategoriesData } from '../services/RequestApi';

export default {

  namespace: 'categories',

  state: {
    data: {}
  },

  subscriptions: {
    setup ({dispatch, history}) {  // eslint-disable-line
    }
  },

  effects: {
    * fetch ({payload}, {put, call}) {
      const response = yield call(getCategoriesData, payload);
      yield put({
        type: 'refresh',
        payload: response.data
      });
    }
  },

  reducers: {
    refresh (state, action) {
      return {
        ...state,
        data: action.payload
      };
    }
  }

};
