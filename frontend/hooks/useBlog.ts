import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createBlog(values: any){
    const token = getDataFromLocalStorage('access_token0')
   
    const data = await axios.post('http://127.0.0.1:8000/blog', 
    values,
    {
       headers: {
         'Authorization': `Bearer=${token}`,
         'Content-Type': 'application/json',
       }})
    console.log(data)
    return data
}
export async function getBlog() {
  const blogs = await axios.get('http://localhost:8000/blog')
  return blogs.data

}

export async function searchBlog(blog: string){
  console.log(blog)
  const blogs = await axios.get(`http://127.0.0.1:8000/blog/search`,
    {
      params: {
        search: blog,
      },
    }
  )
  return blogs.data
}

export async function deleteBlog(blogId: string){
   await axios.delete(`http://127.0.0.1:8000/blog/delblog`,
  {
    params: {
      id: blogId,
    },
  }
  )
}

export async function updateBlog(blogId: string, values: any){
  const data = await axios.put(`http://127.0.0.1:8000/blog/update`,{
    values,
    params: {
      id: blogId,
    },
    
  })
}
