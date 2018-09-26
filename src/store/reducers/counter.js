import { INCREMENT, DECREMENT, CLEAR } from '../actionTypes';

const initialState = { count: 0 };

const counter = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case CLEAR:
      return {
        ...state,
        count: 0,
      };
    default:
      return state;
  }
};

export default counter;
