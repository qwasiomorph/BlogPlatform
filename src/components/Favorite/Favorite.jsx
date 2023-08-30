import { useState } from 'react';
import PropTypes from 'prop-types';

import { useFavoriteArticleMutation, useUnFavoriteArticleMutation } from '../../store/store';

import style from './Favorite.module.scss';

const Favorite = ({ favorited, favoritesCount, slug }) => {
  const [favoritedClientView, setFavorited] = useState(favorited);
  const [favoriteCountClientView, setFavoriteCount] = useState(favoritesCount);

  const [favorite] = useFavoriteArticleMutation();
  const [unFavorite] = useUnFavoriteArticleMutation();

  const toggleFavorite = () => {
    if (favoritedClientView) {
      unFavorite(slug);
      return;
    }
    favorite(slug);
  };

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
    <div className={style.favourites}>
      <div
        onClick={handleFavorite}
        className={[style.favouritesIcon, favoritedClientView && style['favouritesIcon--filled']].join(' ')}
      ></div>
      {favoriteCountClientView}
    </div>
  );
};

Favorite.defaultProps = {
  favorited: false,
  favoritesCount: 0,
  slug: '',
};

Favorite.propTypes = {
  favorited: PropTypes.bool,
  favoritesCount: PropTypes.number,
  slug: PropTypes.string,
};

export default Favorite;
