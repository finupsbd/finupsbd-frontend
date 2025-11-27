
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
    // console.log(jsonData)
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







export const getAllBlogs = async () => {
// payload: any
  try {
    const res = await fetch(`${url}/blogs/all-blogs`);

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

