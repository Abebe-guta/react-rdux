import {useSelector, useDispatch} from "react-redux";
import { selectAllPosts,getPostStatus,getPostsError,fetchPosts } from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useEffect } from "react";
import { fetchUsers , selectAllUsers} from "../Users/usersSLice";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostsError);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

   useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [users.length, dispatch]);

  
let content;

  if (users.length === 0 || postStatus === "loading") {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));

    content = orderedPosts.map(post => 
      <PostsExcerpt key={post.id} post={post} />
    );
  } else if (postStatus === "failed") {
    content = <p>Error: {error}</p>;
  }
  return (
    <section className="posts-list">
      <h2>Posts</h2>
    

      {content}
     
    </section>
  );
}
export default PostsList