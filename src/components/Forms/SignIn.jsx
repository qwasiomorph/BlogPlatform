import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router-dom";
import { setToken, useLoginUserMutation } from "../../store/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import routes from "../../utils/routes";

const SignIn = ({ style }) => {
  const [login, { data }] = useLoginUserMutation();
  const { articleList } = routes;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      const token = data.user.token;
      localStorage.setItem("authToken", token);
      dispatch(setToken(token));
    }
  }, [data]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: {} });

  const onSubmit = async (body) => {
    await login(body);
    navigate(articleList);
  };
  const onReject = (data) => {
    console.log(data);
  };

  return (
    <form className={style.card} onSubmit={handleSubmit(onSubmit, onReject)}>
      <h2 className={style.mainlabel}>Sign In</h2>
      <div className={style.inputWrap}>
        <label className={style.inputLabel}>
          Email address{" "}
          <input
            {...register("email", {
              required: true,
              pattern: /(\w)*([@]+)(\w)+([.]{1})(\w)+/g,
            })}
            className={[
              style.input,
              errors.email && style["input--invalid"],
            ].join(" ")}
            type="text"
            placeholder="Email address"
          />
          {errors.email && (
            <p className={style.errorMessage}>Your Email needs to be valid</p>
          )}
        </label>
        <label className={style.inputLabel}>
          Password{" "}
          <input
            {...register("password", {
              required: true,
            })}
            className={[
              style.input,
              errors.password && style["input--invalid"],
            ].join(" ")}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          {errors.password && <p className={style.errorMessage}>Required</p>}
        </label>

        <button className={style.submitButton} type="submit">
          Login
        </button>
        <p className={style.loginLink}>
          Don’t have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </div>
    </form>
  );
};

export default SignIn;
