import React from "react";                                                                                                      
import { MyPostsProps } from "../types/PostType"
import PostList from "../components/PostList";                                  
                                                                                    
const MyPosts: React.FC<MyPostsProps> = ({                                                                  
  username,                                                                             
  posts,                                                                                                                                                    
  editPost,                                                                         
  deletePost,                                                                       
}) => {                                                                             
  const myPosts = posts?.filter((post) => post.author === username);           
  return (                                                                          
    <PostList                                                                       
      username={username}                                                                   
      posts={myPosts}                                                                                                                       
      editPost={editPost}                                                           
      deletePost={deletePost}                                                       
    />                                                                              
  );                                                                                
};                                                                                  
export default MyPosts;