import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createreportbusiness(values: any){
    const token = getDataFromLocalStorage('access_token0')
   
    const data = await axios.post('https://backend.pehlastake.com/reportbusiness', 
    values,
    {
       headers: {
         'Authorization': `Bearer=${token}`,
         'Content-Type': 'application/json',
       }})
    console.log(data)
    return data
}
export async function businessReports() {
  const reportbusinesss = await axios.get('https://backend.pehlastake.com/reportbusiness')
  return reportbusinesss.data

}

export async function searchbusinessReports(reportbusiness: string){
  console.log(reportbusiness)
  const reportbusinesss = await axios.get(`https://backend.pehlastake.com/reportbusiness/search`,
    {
      params: {
        search: reportbusiness,
      },
    }
  )
  return reportbusinesss.data
}

export async function deletereportbusiness(reportbusinessId: string){
   await axios.delete(`https://backend.pehlastake.com/reportbusiness/delreportbusiness`,
  {
    params: {
      id: reportbusinessId,
    },
  }
  )
}

export async function updatereportbusiness(reportbusinessId: string, values: any){
  const data = await axios.put(`https://backend.pehlastake.com/reportbusiness/update`,{
    values,
    params: {
      id: reportbusinessId,
    },
    
  })
}


export async function investorReports() {
  const reportbusinesss = await axios.get('https://backend.pehlastake.com/reportinvestor')
  return reportbusinesss.data

}

export async function searchinvestorReports(reportbusiness: string){
  console.log(reportbusiness)
  const reportbusinesss = await axios.get(`https://backend.pehlastake.com/reportinvestor/search`,
    {
      params: {
        search: reportbusiness,
      },
    }
  )
  return reportbusinesss.data
}
