const Post = ({ post }) => {
    return (
        <div className="post">
            <h4>{post.user.username}</h4>
            <p>{post.content}</p>
            {post.image && <img src={post.image} alt="Post media" />}
            <div>
                <span>{post.created_at}</span>
            </div>
        </div>
    );
};

export default Post;
