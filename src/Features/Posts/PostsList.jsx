// src/features/posts/PostsList.jsx

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  selectPostIds,
  getPostStatus,
  getPostsError,
  fetchPosts
} from "./postsSlice";

import {
  fetchUsers,
  selectAllUsers
} from "../Users/usersSlice";

import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const dispatch = useDispatch();

  const postIds = useSelector(selectPostIds); // ✅ gets sorted post IDs from entity adapter
  const postStatus = useSelector(getPostStatus);
  const error = useSelector(getPostsError);
  const users = useSelector(selectAllUsers); // to ensure users are loaded before displaying posts

  // Fetch posts on mount if status is idle
  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  // Fetch users if not already fetched
  useEffect(() => {
    if (users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [users.length, dispatch]);

  // Conditionally render content based on load status
  let content;

  if (postStatus === "loading" || users.length === 0) {
    content = <p>Loading...</p>;
  } else if (postStatus === "succeeded") {
    content = postIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (postStatus === "failed") {
    content = <p>Error: {error}</p>;
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
