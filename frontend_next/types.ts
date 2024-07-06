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