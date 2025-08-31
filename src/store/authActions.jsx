import { authActions } from "./authSlice";
let logoutTimer;
import { SESSION_DURATION } from "../utils/data";

export const autoLogout = () => {
  return (dispatch) => {
    if (logoutTimer) clearTimeout(logoutTimer);

    const loginTime = Number(localStorage.getItem("loginTime"));
    const remainingTime = SESSION_DURATION - (Date.now() - loginTime);

    logoutTimer = setTimeout(
      () => {
        dispatch(authActions.logout());
      },
      remainingTime > 0 ? remainingTime : 0
    );
  };
};
