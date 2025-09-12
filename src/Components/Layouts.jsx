import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, getPostStatus } from "../Features/Posts/postsSlice";
import { fetchUsers } from "../Features/Users/usersSlice";
import Header from "./Header";

const Layouts = () => {
  const dispatch = useDispatch();
  const postStatus = useSelector(getPostStatus);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
      dispatch(fetchUsers());
    }
  }, [dispatch, postStatus]);

  return (
    <>
          <Header />
       <main className="App">
      <Outlet />
    </main>
    </>
 
  );
};

export default Layouts;
