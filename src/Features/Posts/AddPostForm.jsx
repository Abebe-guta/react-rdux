import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../Users/usersSLice";

const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addRequestStatus, setAddRequestStatus] = useState("idle");

  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onUserIdChange = (e) => setUserId(e.target.value);

  const canSave = [title, content, userId].every(Boolean) && addRequestStatus === "idle";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (canSave) {
      setAddRequestStatus("pending");
      dispatch(addNewPost({ title, content, userId }))
        .unwrap()
        .then(() => {
          setTitle("");
          setContent("");
          setUserId("");
        })
        .catch((error) => {
          console.error("Failed to save the post: ", error);
        })
        .finally(() => setAddRequestStatus("idle"));
    }
  };

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className="add-post-form">
      <h3>Add a New Post</h3>
      <form onSubmit={handleSubmit} className="add-post-form__form">
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          placeholder="Post Title"
          value={title}
          onChange={onTitleChange}
          className="add-post-form__input"
        />

        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={onUserIdChange}
          className="add-post-form__select"
        >
          <option value="">Select an Author</option>
          {userOptions}
        </select>

        <label htmlFor="postContent">Post Content</label>
        <textarea
          id="postContent"
          placeholder="Post Content"
          value={content}
          onChange={onContentChange}
          className="add-post-form__textarea"
        />

        <button type="submit" disabled={!canSave} className="add-post-form__button">
          Add Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
