import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createInvestor(corporateProfile: any, bankStatement: any){
    const userID = getDataFromLocalStorage('userID')
    const token = getDataFromLocalStorage('access_token0')
    const data = await axios.post('https://backend.pehlastake.com/investor', 
     {
        userId :userID,
        corporateProfile: "Corporate Profile",
        investorProof: "investorProofURl",
        investmentRangeStart: 0,
        investmentRangeEnd: 1000000000   

    },
    {
       headers: {
         'Authorization': `Bearer=${token}`,
         'Content-Type': 'application/json',
       }})
    console.log(data)
    setDataToLocalStorage("InvestorData" , JSON.stringify(data))
    return data
}

export async function createInvestor2(values: any){
  const userID = getDataFromLocalStorage('userID')
  const token = getDataFromLocalStorage('access_token0')
  const data = await axios.post('https://backend.pehlastake.com/investor', 
   {
      userId :userID,
      industry : values.interest,
      locations: values.locations,
      investmentRangeStart: values.investmentRangeStart,
      investmentRangeEnd: values.investmentRangeEnd   

  },
  {
     headers: {
       'Authorization': `Bearer=${token}`,
       'Content-Type': 'application/json',
     }})
  console.log(data)
  setDataToLocalStorage("InvestorData" , JSON.stringify(data))
  return data
} 

export async function verifiedinvestor() {
 
  const data = await axios.get('http://localhost:8000/investor/nonverified')
  return data.data
 
}


export async function getinvestor(id:any){
  console.log(id)
  const data = await axios.get('http://localhost:8000/investor/one',
   { params: {
      id: id,
    },
  }
  )
  console.log(data.data)
  return data.data  
}

export async function delinvestor(id:any){
  
    const data = await axios.put('http://localhost:8000/investor',{
      isBanned: true,
    
    },
    { params: {
      id: id,
    }})
  
    return data.data
  }


export async function updateinvestor(id:any){
  const data = await axios.put('http://localhost:8000/investor',{
    isVerified: true,
  
  },
  { params: {
    id: id,
  }})

  return data.data
}

export async function hideinvestor(id:any){
  const data = await axios.put('http://localhost:8000/investor',{
    isVerified: false,
  
  },
  { params: {
    id: id,
  }})

  return data.data
}

export async function getAllInvestors(){
  const data = await axios.get('http://localhost:8000/investor')
  return data.data
}
