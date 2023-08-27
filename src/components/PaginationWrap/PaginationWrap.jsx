import { useSearchParams } from "react-router-dom";
import style from "./PaginationWrap.module.scss";

import { Pagination } from "antd";

const PaginationWrap = (info) => {
  const [searchParams, setParams] = useSearchParams({ page: 1 });
  const handlePage = (e) => {
    setParams({ page: e });
  };
  return (
    <div className={style.paginationWrap}>
      <Pagination
        defaultCurrent={1}
        total={info.info ? info.info.articlesCount : 0}
        onChange={handlePage}
      />
    </div>
  );
};

export default PaginationWrap;
