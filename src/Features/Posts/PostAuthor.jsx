import { useSelector } from "react-redux";
import { selectAllUsers } from "../Users/usersSlice"; // double-check this path/spelling
import { useMemo } from "react";

const PostAuthor = ({ userId }) => {
  const users = useSelector(selectAllUsers);

  const author = useMemo(() => {
    const match = users.find(user => String(user.id) === String(userId));
    console.log("Author lookup:", { userId, users, match });
    return match;
  }, [users, userId]);

  return <span>By {author ? author.username : "Unknown Author"}</span>;
};

export default PostAuthor;
