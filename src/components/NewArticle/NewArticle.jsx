import { useEffect, useState } from "react";
import style from "./NewArticle.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import routes from "../../utils/routes";
import {
  useEditArticleMutation,
  useNewArticleMutation,
} from "../../store/store";

import PropTypes from "prop-types";

const NewArticle = ({ data, slug }) => {
  const { articleList } = routes;

  const isNewArticlePath = !data;

  const [tags, setTags] = useState([]);

  const [sendNew] = useNewArticleMutation();
  const [sendEdited] = useEditArticleMutation();

  const [tagInputValue, setTagInputValue] = useState("");

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (data) {
      reset(data.article);
    }
  }, [data]);

  const onSubmit = (data) => {
    if (isNewArticlePath) {
      sendNew({ ...data, tagList: tags });
    } else {
      sendEdited({ ...data, slug });
    }
    navigate(articleList);
  };

  const handleAddTag = () => {
    setTags([...tags, tagInputValue]);
    setTagInputValue("");
  };

  const handleTagInputChange = (e) => {
    setTagInputValue(e.target.value);
  };

  const handleDeleteTag = (e) => {
    setTags(tags.filter((tag) => tag !== e.target.name));
  };

  return (
    <div className={style.bgWrapper}>
      <div className={style.mainWrapper}>
        <h4 className={style.articleTitle}>
          {isNewArticlePath ? "Create new article" : "Edit article"}
        </h4>
        <form className={style.articleForm} onSubmit={handleSubmit(onSubmit)}>
          <label className={style.inputLabel}>
            Title
            <input
              {...register("title", {
                required: true,
              })}
              className={[
                style.input,
                errors.title && style["input--invalid"],
              ].join(" ")}
              type="text"
              placeholder="Title"
            />
          </label>
          <label className={style.inputLabel}>
            Short description
            <input
              {...register("description", {
                required: true,
              })}
              className={[
                style.input,
                errors.description && style["input--invalid"],
              ].join(" ")}
              type="text"
              placeholder="Description"
            />
          </label>
          <label className={style.inputLabel}>
            Text
            <textarea
              {...register("body", {
                required: true,
              })}
              className={[
                style.input,
                style.inputLarge,
                errors.body && style["input--invalid"],
              ].join(" ")}
              type="text"
              placeholder="Text"
            ></textarea>
          </label>
          {isNewArticlePath && (
            <div className={style.tagInputWrapper}>
              Tags
              {tags.map((tag) => (
                <label
                  key={tag}
                  className={[style.inputLabel, style.tagInputLabel].join(" ")}
                >
                  <input
                    className={style.input}
                    type="text"
                    value={tag}
                    disabled
                  />
                  <button
                    className={[style.button, style.highLight].join(" ")}
                    type="button"
                    onClick={handleDeleteTag}
                    name={tag}
                  >
                    Delete
                  </button>
                </label>
              ))}
              <label
                className={[style.inputLabel, style.tagInputLabel].join(" ")}
              >
                <input
                  className={style.input}
                  value={tagInputValue}
                  onChange={handleTagInputChange}
                  type="text"
                  placeholder="Tag"
                />
                <button
                  className={style.button}
                  type="button"
                  onClick={handleAddTag}
                >
                  Add tag
                </button>
              </label>
            </div>
          )}
          <button
            className={[style.button, style.submit].join(" ")}
            type="submit"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

NewArticle.defaultProps = {
  data: {},
  slug: "",
};

NewArticle.propTypes = {
  data: PropTypes.object,
  slug: PropTypes.string,
};

export default NewArticle;
