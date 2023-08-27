import { useNavigate, useParams, useResolvedPath } from "react-router-dom";
import style from "./Article.module.scss";
import { useArticleQuery, useDeleteArticleMutation } from "../../store/store";
import parseDate from "../../utils/parseDate";
import Showdown from "showdown";
import { useSelector } from "react-redux";
import { selectUserName } from "../../store/selectors";
import routes from "../../utils/routes";
import NewArticle from "../NewArticle/NewArticle";
import showConfirm from "../ModalComponent";

const Article = () => {
  const { editArticle, articleList } = routes;
  const navigate = useNavigate();
  const { slug } = useParams();
  const { pathname } = useResolvedPath();

  const isEditing = pathname.includes(editArticle);

  const [deleteArticle] = useDeleteArticleMutation();

  const { data } = useArticleQuery(slug);
  const userName = useSelector(selectUserName);
  let isAuthor = false;

  let html = "";
  if (data) {
    const converter = new Showdown.Converter();
    html = converter.makeHtml(data.article.body);
    isAuthor = userName === data.article.author.username;
  }

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

  if (data && isEditing) {
    return <NewArticle data={data} slug={slug} />;
  }

  return (
    <div className={style.bgWrapper}>
      {data && (
        <div className={style.mainWrapper}>
          <div className={style.header}>
            <div>
              <div>
                <h4 className={style.articleTitle}>{data.article.title}</h4>
                <div className={style.favourites}>
                  {data.article.favoritesCount}
                </div>
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
                <div className={style.createdAt}>
                  {parseDate(data.article.createdAt)}
                </div>
              </div>
              <img
                src={data.article.author.image}
                alt="user"
                width={46}
                height={46}
              />
            </div>
          </div>
          <div className={style.desc}>
            <p>{data.article.description}</p>
            {isAuthor && (
              <div className={style.editWrap}>
                <button
                  className={[style.button, style.highLight].join(" ")}
                  type="button"
                  onClick={handleModalShow}
                >
                  Delete
                </button>
                <button
                  className={[style.button, style.success].join(" ")}
                  type="button"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
          <p
            className={style.body}
            dangerouslySetInnerHTML={{ __html: html }}
          ></p>
        </div>
      )}
    </div>
  );
};

export default Article;
