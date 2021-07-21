export const initialState = null;

export const reducer = (state, action) => {
  if (action.type === "USER") {
    return action.payload;
  } else if (action.type === "CLEAR") {
    return null;
  } else if (action.type === "UPDATE") {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    };
  } else if (action.type === "UPDATEPIC") {
    return {
      ...state,
      image: action.payload,
    };
  } else if (action.type === "UPDATEINFO") {
    return {
      ...state,
     username: action.payload.username,
     bio : action.payload.bio
    };
  }

  return state;
};
