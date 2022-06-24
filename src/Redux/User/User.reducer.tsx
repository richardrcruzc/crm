import { UserActionTypes } from './User.types';

const INITIAL_STATE = {
  currentUser: null,
};

const userReducer = (
  state = INITIAL_STATE,
  action: { type: any; payload: any },
) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
