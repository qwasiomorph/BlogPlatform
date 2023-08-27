import { useLocation } from "react-router-dom";

import SignUp from "../Forms/SignUp";
import SignIn from "../Forms/SignIn";

import style from "./Login.module.scss";

import routes from "../../utils/routes";
import EditProfile from "../Forms/EditProfile";

const Login = () => {
  const { pathname } = useLocation();
  const { signIn, signUp, profileEdit } = routes;
  const isSignIn = signIn === pathname;
  const isSignUp = signUp === pathname;
  const isProfileEdit = profileEdit === pathname;
  return (
    <div className={style.wrapper}>
      {isSignUp && <SignUp style={style} />}
      {isSignIn && <SignIn style={style} />}
      {isProfileEdit && <EditProfile style={style} />}
    </div>
  );
};

export default Login;
