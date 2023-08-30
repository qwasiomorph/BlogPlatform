import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Favorite from '../Favorite';
import parseDate from '../../utils/parseDate';

import style from './ArticlePreview.module.scss';

const ArticlePreview = ({ info }) => {
  const { slug, title, author, description, favoritesCount, tagList, createdAt, favorited } = info;

  return (
    <div className={style.card}>
      <div className={style.header}>
        <div>
          <div>
            <Link to={`${slug}`} style={{ textDecoration: 'none' }}>
              <h4 className={style.articleTitle}>{title}</h4>
            </Link>
            <Favorite favorited={favorited} favoritesCount={favoritesCount} slug={slug} />
          </div>

          <div className={style.tagList}>
            {tagList.map((tag) => {
              if (tag) {
                return (
                  <div key={tag} className={style.tag}>
                    {tag}
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={style.userInfo}>
          <div className={style.userNameWrap}>
            <div>{author.username}</div>
            <div className={style.createdAt}>{parseDate(createdAt)}</div>
          </div>
          <img src={author.image} alt="user" width={46} height={46} />
        </div>
      </div>
      <p className={style.desc}>{description}</p>
    </div>
  );
};

ArticlePreview.defaultProps = {
  info: {
    slug: '',
    title: '',
    author: '',
    description: '',
    favoritesCount: 0,
    tagList: [],
    createdAt: '',
    favorited: false,
  },
  toggleFavorite: () => {},
};

ArticlePreview.propTypes = {
  info: PropTypes.object,
  toggleFavorite: PropTypes.func,
};

export default ArticlePreview;
