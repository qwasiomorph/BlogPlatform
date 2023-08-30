import { Navigate, Route, Routes } from 'react-router-dom';

import ArticleList from './components/ArticleList';
import Menu from './components/Menu';
import Article from './components/Article';
import Login from './components/Login';
import routes from './utils/routes';
import NewArticle from './components/NewArticle/NewArticle';
import style from './App.module.scss';

function App() {
  const { articleList, signIn, signUp, profileEdit, newArticle, article, editArticle } = routes;
  return (
    <div className={style.appWrap}>
      <Menu />
      <Routes>
        <Route path="/" element={<Navigate to={articleList} />} />
        <Route path={articleList}>
          <Route index element={<ArticleList />} />
          <Route path={article} element={<Article />}>
            <Route path={editArticle} element={<NewArticle />} />
          </Route>
        </Route>
        <Route path={signIn} element={<Login />} />
        <Route path={signUp} element={<Login />} />
        <Route path={profileEdit} element={<Login />} />
        <Route path={newArticle} element={<NewArticle />} />
        <Route path="*" element={<Navigate to={articleList} />} />
      </Routes>
    </div>
  );
}

export default App;
