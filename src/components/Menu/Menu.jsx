import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { setToken, setUserName, useCurrentUserQuery } from '../../store/store';
import { selectToken } from '../../store/selectors';

import style from './Menu.module.scss';

const Menu = () => {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    navigate(e.target.name);
  };

  const dispatch = useDispatch();

  const token = useSelector(selectToken);

  const { currentData } = useCurrentUserQuery(token);

  useEffect(() => {
    if (currentData) {
      dispatch(setUserName(currentData.user.username));
    }
  }, [currentData]);

  const handleLogOut = () => {
    localStorage.removeItem('authToken');
    dispatch(setToken(''));
    dispatch(setUserName(''));
  };

  return (
    <div className={style.menuWrapper}>
      <Link to={'articles'} style={{ textDecoration: 'none' }}>
        <h6 className={style.blogLabel}>Realworld Blog</h6>
      </Link>
      {currentData ? (
        <div className={style.loginWrap}>
          <button
            className={[style.button, style.buttonSucess].join(' ')}
            type="button"
            name="new-article"
            onClick={handleNavigate}
          >
            Create Article
          </button>
          <Link className={style.userData} to="profile" style={{ cursor: 'pointer', textDecoration: 'none' }}>
            <h6 className={style.blogLabel} name="profile">
              {currentData.user.username}
            </h6>
            <img src={currentData.user.image || '/assets/user.svg'} alt="Avatar" width={36} height={36} />
          </Link>
          <button onClick={handleLogOut} className={style.button} type="button" name="sign-up">
            Log Out
          </button>
        </div>
      ) : (
        <div className={style.loginWrap}>
          <button className={style.button} type="button" name="sign-in" onClick={handleNavigate}>
            Sign In
          </button>
          <button
            className={[style.button, style.buttonSucess].join(' ')}
            type="button"
            name="sign-up"
            onClick={handleNavigate}
          >
            Sign Up
          </button>
        </div>
      )}
    </div>
  );
};

export default Menu;
