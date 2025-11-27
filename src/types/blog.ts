export interface blog {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  createdBy: string;
  thumb: string;
  largeImage: string;
  slug: string;
  publishDate: string | null;
  createdAt: string;
  updatedAt: string;
  category: string;
}




///////api responce


export type TAuthorProfile = {
  avatar: string;
};


export type TAuthor = {
  id: string;
  name: string;
  email: string;
  profile: TAuthorProfile;
};

export type TBlog = {
  id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  tags: string[];
  bannerImage: string;
  author: TAuthor;
};

export type TPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};


export type TBlogApiResponse = {
  data: TBlog[];
  pagination: TPagination;
};