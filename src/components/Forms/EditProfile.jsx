import { useForm } from "react-hook-form";
import {
  getPasswordErrorText,
  getUserNameErrorText,
} from "../../utils/errorMessages";
import { setToken, useEditProfileMutation } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import routes from "../../utils/routes";
import { useEffect } from "react";

const EditProfile = ({ style }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articleList } = routes;
  const [editProfile, { data }] = useEditProfileMutation();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: {} });
  useEffect(() => {
    if (data) {
      const token = data.user.token;
      localStorage.setItem("authToken", token);
      dispatch(setToken(token));
    }
  }, [data]);
  const onSubmit = async (body) => {
    await editProfile(body);
    navigate(articleList);
  };
  const onReject = (data) => {
    console.log(data);
  };
  return (
    <form className={style.card} onSubmit={handleSubmit(onSubmit, onReject)}>
      <h2 className={style.mainlabel}>Edit Profile</h2>
      <div className={style.inputWrap}>
        <label className={style.inputLabel}>
          Username{" "}
          <input
            {...register("username", {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            className={[
              style.input,
              errors.username && style["input--invalid"],
            ].join(" ")}
            type="text"
            placeholder="Username"
          />
          {errors.username && (
            <p className={style.errorMessage}>
              {`Your user name needs to be${getUserNameErrorText(
                errors.username
              )}.`}
            </p>
          )}
        </label>
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
              minLength: 6,
              maxLength: 40,
            })}
            className={[
              style.input,
              errors.password && style["input--invalid"],
            ].join(" ")}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          {errors.password && (
            <p className={style.errorMessage}>
              {`Your password needs to be${getPasswordErrorText(
                errors.password
              )}.`}
            </p>
          )}
        </label>
        <label className={style.inputLabel}>
          Repeat Password{" "}
          <input
            className={style.input}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
        </label>
        <label className={style.inputLabel}>
          {"Avatar Image (url)"}
          <input
            className={style.input}
            type="text"
            placeholder="Avatar Image"
          />
        </label>
        <button className={style.submitButton} type="submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
