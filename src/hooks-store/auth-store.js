export const authActions = {
  USER_AUTHENTICATED: (state, decodedToken) => {
    return {
      ...state,
      ...{ auth: { isAuth: true, username: decodedToken.username || "" } },
    };
  },
  USER_SIGNED_OUT: (state) => {
    return { ...state, ...{ auth: { isAuth: false, username: "" } } };
  },
};
