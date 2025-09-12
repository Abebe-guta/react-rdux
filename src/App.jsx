import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layouts from "./Components/Layouts";
import PostsList from "./Features/Posts/PostsList";
import AddPostForm from "./Features/Posts/AddPostForm";
import SinglePostPage from "./Features/Posts/SinglePostPage";
import EditPostForm from "./Features/Posts/EditPostForm";
import UserPage from "./Features/Users/UserPage";
import UsersList from "./Features/Users/UsersList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layouts />}>
        <Route index element={<Navigate to="/posts" replace />} />  // 👈 Add this

        {/* Redirect /post to /posts for backwards compatibility */}
        <Route path="post" element={<Navigate to="/posts" replace />} />

        {/* Grouped posts routes under /posts */}
        <Route path="posts">
          <Route index element={<PostsList />} /> {/* /posts */}
          <Route path="add" element={<AddPostForm />} /> {/* /posts/add */}
          <Route path="edit/:postId" element={<EditPostForm />} /> {/* /posts/edit/123 */}
          <Route path=":postId" element={<SinglePostPage />} /> {/* /posts/123 */}
        </Route>

        {/* User-related routes */}
        <Route path="users" element={<UsersList />} /> {/* /users */}
        <Route path="user/:userId" element={<UserPage />} /> {/* /user/5 */}

        {/* Catch-all route for unknown paths */}
        <Route path="*" element={<Navigate to="/posts" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
