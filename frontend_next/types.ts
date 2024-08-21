type ImagePreviewResType = {
    url: string;
    title: string;
    siteName: string | undefined;
    description: string | undefined;
    mediaType: string;
    contentType: string | undefined;
    images: string[];
    videos: {};
    favicons: string[];
};

type PostStateType = {
    title?:string;
    url?:string;
    image_url?:string;
    description?:string;
}

type ApiResponseType<T> = {
    data: Array<T> | [];
    path: string;
    per_page: number;
    next_cursor?: string;
    next_page_url?: string;
    prev_cursor?: string;
    prev_page_url?: string;
  }

type PostType = {
    id: number;
    user_id: number;
    title: string;
    url: string;
    image_url: string;
    description: string;
    comment_count: number;
    vote: number;
    created_at: string;
    user:UserType;
  }

  type UserType = {
    id?: number;
    name?: string;
    profile_image?: string;
    username?: string;
    email?: string;
  }