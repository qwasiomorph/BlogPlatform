import { useParams, useResolvedPath } from 'react-router-dom';
import Showdown from 'showdown';
import { useSelector } from 'react-redux';

import { selectUserName } from '../../store/selectors';
import routes from '../../utils/routes';
import NewArticle from '../NewArticle/NewArticle';
import { useArticleQuery } from '../../store/store';
import ArticleView from '../ArticleView';

const Article = () => {
  const { editArticle } = routes;
  const { slug } = useParams();
  const { pathname } = useResolvedPath();

  const isEditing = pathname.includes(editArticle);

  const { data } = useArticleQuery(slug);
  const userName = useSelector(selectUserName);
  let isAuthor = false;

  let html = '';
  if (data) {
    const converter = new Showdown.Converter();
    html = converter.makeHtml(data.article.body);
    isAuthor = userName === data.article.author.username;
  }

  if (data && isEditing) {
    return <NewArticle data={data} slug={slug} />;
  }

  return <ArticleView {...{ data, html, isAuthor, slug }} />;
};

export default Article;
