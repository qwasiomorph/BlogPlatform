import { useSearchParams } from 'react-router-dom';
import { useMemo } from 'react';

import { useArticleListQuery } from '../../store/store';
import ArticlePreview from '../ArticlePreview';
import PaginationWrap from '../PaginationWrap';

import style from './ArticleList.module.scss';

const ArticleList = () => {
  const [searchParams] = useSearchParams();

  const { data } = useArticleListQuery(searchParams.get('page'));

  let articles = [];

  if (data) {
    articles = data.articles;
  }

  const articleList = useMemo(() => articles, [articles, searchParams]);

  return (
    <div className={style.articlelistWrapper}>
      {articleList.map((article) => (
        <ArticlePreview key={article.createdAt} info={article} />
      ))}
      <PaginationWrap info={data} />
    </div>
  );
};

export default ArticleList;
