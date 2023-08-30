import { useNavigate } from 'react-router-dom';

import routes from '../../utils/routes';
import parseDate from '../../utils/parseDate';
import Favorite from '../Favorite';
import { useDeleteArticleMutation } from '../../store/store';
import showConfirm from '../ModalComponent';

import style from './ArticleView.module.scss';

const ArticleView = ({ data, html, isAuthor, slug }) => {
  const { editArticle, articleList } = routes;
  const navigate = useNavigate();
  const [deleteArticle] = useDeleteArticleMutation();

  const handleEditClick = () => {
    navigate(editArticle);
  };

  const handleArticleDelete = () => {
    deleteArticle(slug);
    navigate(articleList);
  };

  const handleModalShow = () => {
    return showConfirm(handleArticleDelete);
  };

  return (
    <div className={style.bgWrapper}>
      {data && (
        <div className={style.mainWrapper}>
          <div className={style.header}>
            <div>
              <div>
                <h4 className={style.articleTitle}>{data.article.title}</h4>
                <Favorite favorited={data.article.favorited} favoritesCount={data.article.favoritesCount} slug={slug} />
              </div>

              <div className={style.tagList}>
                {data.article.tagList.map((tag) => {
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
                <div>{data.article.author.username}</div>
                <div className={style.createdAt}>{parseDate(data.article.createdAt)}</div>
              </div>
              <img src={data.article.author.image} alt="user" width={46} height={46} />
            </div>
          </div>
          <div className={style.desc}>
            <p>{data.article.description}</p>
            {isAuthor && (
              <div className={style.editWrap}>
                <button className={[style.button, style.highLight].join(' ')} type="button" onClick={handleModalShow}>
                  Delete
                </button>
                <button className={[style.button, style.success].join(' ')} type="button" onClick={handleEditClick}>
                  Edit
                </button>
              </div>
            )}
          </div>
          <p className={style.body} dangerouslySetInnerHTML={{ __html: html }}></p>
        </div>
      )}
    </div>
  );
};

export default ArticleView;
