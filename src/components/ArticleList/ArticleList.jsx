import {
  useArticleListQuery,
  useFavoriteArticleMutation,
  useUnFavoriteArticleMutation,
} from "../../store/store";
import style from "./ArticleList.module.scss";

import ArticlePreview from "../ArticlePreview";
import PaginationWrap from "../PaginationWrap";
import { useSearchParams } from "react-router-dom";

const ArticleList = () => {
  const [searchParams] = useSearchParams();

  const { data } = useArticleListQuery(searchParams.get("page"));

  const [favorite] = useFavoriteArticleMutation();
  const [unFavorite] = useUnFavoriteArticleMutation();

  const toggleFavorite = (favorited, slug) => {
    if (favorited) {
      unFavorite(slug);
      return;
    }
    favorite(slug);
  };

  return (
    <div className={style.articlelistWrapper}>
      {data &&
        data.articles.map((article) => (
          <ArticlePreview
            key={article.createdAt}
            info={article}
            toggleFavorite={toggleFavorite}
          />
        ))}
      <PaginationWrap info={data} />
    </div>
  );
};

export default ArticleList;
