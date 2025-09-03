import { useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { postAdded } from "./postsSlice";
import { selectAllUsers } from "../Users/usersSLice";


const AddPostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();
  const users = useSelector(selectAllUsers);

  const onTitleChange = (e) => setTitle(e.target.value);
  const onContentChange = (e) => setContent(e.target.value);
  const onUserIdChange = (e) => setUserId(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && content && userId) {
      dispatch(postAdded(title, content, userId));
      setTitle("");
      setContent("");
      setUserId("");
    }
  };
  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);
  
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h3>Add a New Post</h3>
      <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "12px", alignItems: "center"}}>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          placeholder="Post Title"
          value={title}
          onChange={onTitleChange}
          style={{width: "100%", maxWidth: "400px", padding: "8px"}}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select 
        id="postAuthor" 
        value={userId} 
        onChange={onUserIdChange} 
        style={{width: "100%", maxWidth: "400px", padding: "8px"}}>
          <option value="">Select an Author</option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content</label>
        <textarea
          id="postContent"
          placeholder="Post Content"
          value={content}
          onChange={onContentChange}
          style={{width: "100%", maxWidth: "400px", padding: "8px", minHeight: "80px"}}
        />
        <button
          type="submit"
          
          disabled={!canSave}
        >
          Add Post
           </button>
      </form>
    </section>
  );
};

export default AddPostForm;