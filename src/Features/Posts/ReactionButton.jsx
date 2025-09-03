import { useDispatch } from "react-redux";
import { reactionsAdded } from "./postsSlice";


const ReactionEmoji =  {
    thumbsUp: "👍",
    wow: "🎉",
    heart: "❤️",
    rocket: "🚀",
    coffee: "☕",
  };


const ReactionButton = ({ post }) => {
  const dispatch = useDispatch();

  const reactionButtons = Object.entries(ReactionEmoji).map(([name, emoji]) => {
    return (
      <button 
      key={name} 
      onClick={() => dispatch(reactionsAdded({ postId:post.id, reaction: name }))}>
        {emoji} {post.reactions[name]  }
      </button>
    );
  });

  return <div>{reactionButtons}</div>;
};
export default ReactionButton;