import React from "react";
import PostList from "../components/PostList";
import { HomeProps } from "../types/PostType";
const Home: React.FC<HomeProps> = ({
  username,
  posts,
  deletePost,
  editPost,
}) => {
  return (
    <PostList
      posts={posts}
      username={username}
      deletePost={deletePost}
      editPost={editPost}
    />
  );
};

export default Home;