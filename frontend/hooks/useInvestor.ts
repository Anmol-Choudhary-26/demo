import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createInvestor(corporateProfile: any, bankStatement: any){
    const userID = getDataFromLocalStorage('userID')
    const token = getDataFromLocalStorage('access_token0')
    const data = await axios.post('https://backend.pehlastake.com/investor', 
     {
        userId :userID,
        corporateProfile: "Corporate Profile",
        BusinessProof: "BusinessProofURl",
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