import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { getPasswordErrorText, getUserNameErrorText } from '../../utils/errorMessages';
import { setToken, useNewUserMutation } from '../../store/store';
import routes from '../../utils/routes';

const SignUp = ({ style }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { articleList } = routes;
  const [signUp, { data }] = useNewUserMutation();
  useEffect(() => {
    if (data) {
      const token = data.user.token;
      localStorage.setItem('authToken', token);
      dispatch(setToken(token));
    }
  }, [data]);
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useForm({ defaultValues: {} });
  const onSubmit = async (body) => {
    await signUp(body);
    navigate(articleList);
  };

  const passwordsCompare = () => {
    const { password, passwordRepeat } = getValues();
    return password === passwordRepeat;
  };

  return (
    <form className={style.card} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={style.mainlabel}>Create new account</h2>
      <div className={style.inputWrap}>
        <label className={style.inputLabel}>
          Username{' '}
          <input
            {...register('username', {
              required: true,
              minLength: 3,
              maxLength: 20,
            })}
            className={[style.input, errors.username && style['input--invalid']].join(' ')}
            type="text"
            placeholder="Username"
          />
          {errors.username && (
            <p className={style.errorMessage}>
              {`Your user name needs to be${getUserNameErrorText(errors.username)}.`}
            </p>
          )}
        </label>
        <label className={style.inputLabel}>
          Email address{' '}
          <input
            {...register('email', {
              required: true,
              pattern: /(\w)*([@]+)(\w)+([.]{1})(\w)+/g,
            })}
            className={[style.input, errors.email && style['input--invalid']].join(' ')}
            type="text"
            placeholder="Email address"
          />
          {errors.email && <p className={style.errorMessage}>Your Email needs to be valid</p>}
        </label>
        <label className={style.inputLabel}>
          Password{' '}
          <input
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 40,
            })}
            className={[style.input, errors.password && style['input--invalid']].join(' ')}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          {errors.password && (
            <p className={style.errorMessage}>{`Your password needs to be${getPasswordErrorText(errors.password)}.`}</p>
          )}
        </label>
        <label className={style.inputLabel}>
          Repeat Password{' '}
          <input
            {...register('passwordRepeat', {
              required: true,
              validate: passwordsCompare,
            })}
            className={[style.input, errors.passwordRepeat && style['input--invalid']].join(' ')}
            type="password"
            placeholder="Password"
            autoComplete="off"
          />
          {errors.passwordRepeat && <p className={style.errorMessage}>Passwords must match</p>}
        </label>
        <label className={style.checkBox}>
          <input
            {...register('checkbox', {
              required: true,
            })}
            className={style.input}
            type="checkbox"
            placeholder="Password"
          />
          <span className={style.checkMark}></span>
          <span className={errors.checkbox && style['checkbox--invalid']}>
            I agree to the processing of my personal information
          </span>
        </label>
        <button className={style.submitButton} type="submit">
          Create
        </button>
        <p className={style.loginLink}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </div>
    </form>
  );
};

SignUp.defaultProps = {
  style: {
    card: {},
    mainlabel: {},
    inputWrap: {},
    inputLabel: {},
    input: {},
    'input--invalid': {},
    errorMessage: {},
    submitButton: {},
  },
};

SignUp.propTypes = {
  style: PropTypes.object,
};

export default SignUp;
