import { useSelector } from "react-redux";
import { selectAllUsers } from "./usersSlice";  
import { Link } from "react-router-dom";

const UsersList = () => {
  const users = useSelector(selectAllUsers);
  const RenderedList = users.map(user => (
    <li key={user.id}>
      <Link to={`/user/${user.id}`}>{user.name}</Link>
    </li>
  ));
  return (
    <section className="users-list">
      <h2>Users List</h2>
      <ul>
        {RenderedList}
      </ul>
    </section>
  )
}
export default UsersList