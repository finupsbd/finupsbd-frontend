

"use server"
import { cookies } from "next/headers";


const url = process.env.NEXT_PUBLIC_BASE_API





export const postBlog = async (payload: any) => {

  const token = (await cookies()).get("accessToken")?.value;
  if (!token) {
    throw new Error("No authentication token found in cookies");
  }
  try {
    const res = await fetch(`${url}/blogs/create-blog`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },

        body: payload
      },
    );

    const jsonData = await res.json();
    console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error("Error forgot application api call:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const getAllBlogs = async ({
  page = 1,
  limit = 10,
  category,
  search,
  sort,
}: {
  page?: number
  limit?: number
  category?: string
  search?: string
  sort?: string
}) => {
// payload: any
  try {
    const res = await fetch(`${url}/blogs/all-blogs?page=${page}&limit=${limit}&category=${category}&searchTerm=${search}&sort=${sort}`);

    const jsonData = await res.json();
    console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error("Error forgot application api call:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};

export const getSingleBlog = async (id: string) => {
// payload: any
  try {
    const res = await fetch(`${url}/blogs/single-blog/${id}`);

    const jsonData = await res.json();
    console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error("Error forgot application api call:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};






export const createComment = async (payload: {blogId: string, content: string}) => {

  const token = (await cookies()).get("accessToken")?.value;
  if (!token) {
    throw new Error("No authentication token found in cookies");
  }
  try {
    const res = await fetch(`${url}/blogs/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // fix capitalization too
          "Authorization": `Bearer ${token}`
        },

       body: JSON.stringify(payload),
      },
    );

    const jsonData = await res.json();
    console.log(jsonData)
    return jsonData;
  } catch (error) {
    console.error("Error forgot application api call:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};