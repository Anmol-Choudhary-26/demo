import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createBlog(values: any){
    const token = getDataFromLocalStorage('access_token0')
   
    const data = await axios.post('https://backend.pehlastake.com/blog', 
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
  const blogs = await axios.get('https://backend.pehlastake.com/blog')
  return blogs.data

}

export async function searchBlog(blog: string){
  console.log(blog)
  const blogs = await axios.get(`https://backend.pehlastake.com/blog/search`,
    {
      params: {
        search: blog,
      },
    }
  )
  return blogs.data
}

export async function deleteBlog(blogId: string){
   await axios.delete(`https://backend.pehlastake.com/blog/delblog`,
  {
    params: {
      id: blogId,
    },
  }
  )
}

export async function updateBlog(blogId: string, values: any){
  const data = await axios.put(`https://backend.pehlastake.com/blog/update`,{
    values,
    params: {
      id: blogId,
    },
    
  })
}
