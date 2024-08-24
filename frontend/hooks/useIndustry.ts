import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createindustry(values: any){
    const token = getDataFromLocalStorage('access_token0')
   
    const data = await axios.post('https://backend.pehlastake.com/industry', 
    values,
    {
       headers: {
         'Authorization': `Bearer=${token}`,
         'Content-Type': 'application/json',
       }})
    console.log(data)
    return data
}
export async function getindustry() {
  const industrys = await axios.get('https://backend.pehlastake.com/industry')
  return industrys.data

}

export async function searchindustry(industry: string){
  console.log(industry)
  const industrys = await axios.get(`https://backend.pehlastake.com/industry/search`,
    {
      params: {
        search: industry,
      },
    }
  )
  return industrys.data
}

export async function deleteindustry(industryId: string){
   await axios.delete(`https://backend.pehlastake.com/industry/delindustry`,
  {
    params: {
      id: industryId,
    },
  }
  )
}

export async function updateindustry(industryId: string, values: any){
  const data = await axios.put(`https://backend.pehlastake.com/industry/update`,{
    values,
    params: {
      id: industryId,
    },
    
  })
}
