import { useSelector } from "react-redux";
import { selectAllUsers } from "../Users/usersSlice"; // double-check this path/spelling

const PostAuthor = ({ userId }) => {
    const users = useSelector(selectAllUsers)

    const author = users.find(user => user.id.toString() === userId.toString());
    console.log("PostAuthor userId:", userId, "Users:", users);

    return <span>by {author ? author.name : 'Unknown author'}</span>
}
export default PostAuthor
