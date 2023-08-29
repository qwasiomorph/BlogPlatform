import { Link } from "react-router-dom";
import parseDate from "../../utils/parseDate";
import style from "./ArticlePreview.module.scss";
import { useState } from "react";

import PropTypes from "prop-types";

const ArticlePreview = ({ info, toggleFavorite }) => {
  const {
    slug,
    title,
    author,
    description,
    favoritesCount,
    tagList,
    createdAt,
    favorited,
  } = info;

  const [favoritedClientView, setFavorited] = useState(favorited);
  const [favoriteCountClientView, setFavoriteCount] = useState(favoritesCount);

  const handleFavorite = () => {
    toggleFavorite(favoritedClientView, slug);
    setFavorited(!favoritedClientView);
    if (favoritedClientView) {
      setFavoriteCount(favoriteCountClientView - 1);
    } else {
      setFavoriteCount(favoriteCountClientView + 1);
    }
  };

  return (
    <div className={style.card}>
      <div className={style.header}>
        <div>
          <div>
            <Link to={`${slug}`} style={{ textDecoration: "none" }}>
              <h4 className={style.articleTitle}>{title}</h4>
            </Link>
            <div className={style.favourites}>
              <div
                onClick={handleFavorite}
                className={[
                  style.favouritesIcon,
                  favoritedClientView && style["favouritesIcon--filled"],
                ].join(" ")}
              ></div>
              {favoriteCountClientView}
            </div>
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
    slug: "",
    title: "",
    author: "",
    description: "",
    favoritesCount: 0,
    tagList: [],
    createdAt: "",
    favorited: false,
  },
  toggleFavorite: () => {},
};

ArticlePreview.propTypes = {
  info: PropTypes.object,
  toggleFavorite: PropTypes.func,
};

export default ArticlePreview;
