import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButton from "./ReactionButton";

const PostsExcerpt = ({ post }) => {
  return (
    <article className="post-excerpt">
      <h3 className="post-excerpt__title">{post.title}</h3>
      <p className="post-excerpt__content">
        {post.body?.substring(0, 100) || post.content?.substring(0, 100)}
      </p>
      <p className="post-excerpt__meta">
        <PostAuthor userId={post.userId} /> &nbsp;
        <TimeAgo timestamp={post.date} />
      </p>
      <ReactionButton post={post} />
    </article>
  );
};

export default PostsExcerpt;
