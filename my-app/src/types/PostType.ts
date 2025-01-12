export interface Post {
    id?: number, 
    title: string;
    summary: string;
    content: string;
    author?: string;
    likedBy?: [];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatePostRequest {
    title: string;
    summary: string;
    content: string;
}

export interface UpdatePostRequest {
    title: string;
    summary: string;
    content: string;
}

export interface BlogCardPost {
    post: Post;
}

export interface PostPageProps {
    posts: Post[] | [];
    username: string | null;
}

export interface PostListProps {
    username: string|null;
    posts: Post[] | [];
    deletePost: (id: number) => void;
    editPost:(id: number,postData: UpdatePostRequest) => void;
}

export interface EditPostProps {
    posts: Post[] | [];
    editPost:(id: number, postData: UpdatePostRequest) => void;
}

export interface MyPostsProps {
    username: string|null;                                                                            
    posts: Post[] | [];                                                                                                                                                    
    editPost:(id: number, postData: UpdatePostRequest) => void;                                                                        
    deletePost: (id: number) => void;  
}

export interface HomeProps {
    username: string|null;
    posts: Post[] | [];  
    editPost:(id: number, postData: UpdatePostRequest) => void;                                                                        
    deletePost: (id: number) => void;  
}


export interface PostFormProps {
    post?: Post | null;
    onSubmit: (formData: Post) => void;
    title: string;
    onSuccess?: () => void;
    cancelMessage?: string | null;
    successMessage?: string | null;
    errorMessage?: string | null;
  }
  
  export interface CreatePostProps {
    createPost: (post: CreatePostRequest) => void;
    errorMessage?: string | null;
  }
  