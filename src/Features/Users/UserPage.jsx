import { selectUserById } from "./usersSlice";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectPostsByUser } from "../Posts/postsSlice"; // <- use this instead

const UserPage = () => {
  const { userId } = useParams();

  const user = useSelector(state => selectUserById(state, Number(userId)));
  
  const postsForUser = useSelector(state =>
    selectPostsByUser(state, Number(userId))
  );

  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ));

  return (
    <div>
      <h2>{user?.name}</h2>
      <h3>Posts by {user?.name}</h3>
      <ol>{postTitles}</ol>
    </div>
  );
};

export default UserPage;
