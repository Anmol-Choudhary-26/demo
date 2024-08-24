import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createAnnouncement(values: any){
    // const token = getDataFromLocalStorage('access_token0')
    console.log(values)
   const reqData = {
        title: values.title,
        description: values.description,
        notiType: values.notiType
   }
    const data = await axios.post('https://backend.pehlastake.com/notification', 
    reqData,
    {
    //    headers: {
    //      'Authorization': `Bearer=${token}`,
    //      'Content-Type': 'application/json',
    //    }
    })
    console.log(data)
    return data
}
export async function getBlog() {
  const blogs = await axios.get('https://backend.pehlastake.com/blog')
  return blogs.data

}

export async function searchBlog(blog: string, type: string){
  console.log(blog,  type)
  const blogs = await axios.get(`https://backend.pehlastake.com/notification/search`,
    {
      params: {
        search: blog,
        type
      },
    }
  )
  return blogs.data
}

export async function deleteNotification(blogId: string){
   await axios.delete(`https://backend.pehlastake.com/notification`,
  {
    params: {
      id: blogId,
    },
  }
  )
}

export async function updateNotification(blogId: string, values: any){
  const data = await axios.put(`https://backend.pehlastake.com/notification`,{
    values,
    params: {
      id: blogId,
    },
    
  })
}
