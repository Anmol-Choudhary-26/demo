import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createBusiness(values: any){
    const token = getDataFromLocalStorage('access_token0')
    const businessData1 = getDataFromLocalStorage('businessDetails')
    const businessData2 = getDataFromLocalStorage('businessDetails2')
    const businessData3 = getDataFromLocalStorage('businessDetails3')


    const data1 = {
      TangibleIntangibleAssests: businessData3? JSON.parse(businessData3).assets: "",
      userId :getDataFromLocalStorage('userID'),
      establishedDate: businessData1? JSON.parse(businessData1).establishedDate : "",
      industry: businessData1? JSON.parse(businessData1).industry : "",
      name: businessData1? JSON.parse(businessData1).name : "",
      address: businessData1? JSON.parse(businessData1).address : "",
      numberOfEmployees: businessData1? JSON.parse(businessData1).numberOfEmployees : "",
      businessLegalEntityType:  "SOLE_PROPRIETORSHIP",
      businessPhoneNumber: businessData1? JSON.parse(businessData1).name : "",
      productInfo : businessData2? JSON.parse(businessData2).productInfo : "",
      businessInfo : businessData2? JSON.parse(businessData2).businessInfo : "",
      facilityInfo : businessData2? JSON.parse(businessData2).facilityInfo: "",
      currentLoanInfo : businessData3? JSON.parse(businessData3).currentLoans : "",
      totalShareHolders:businessData3? JSON.parse(businessData3).shareholders : "",
      currentMonthlySales: businessData3? JSON.parse(businessData3).monthlySales : "",
      latestReportedSales :businessData3? JSON.parse(businessData3).reportedSales : "",
      OperatingProfitMarginPercentage: businessData3? JSON.parse(businessData3).profitMargin : "",
      valueOfPhysicalAssets : businessData3? JSON.parse(businessData3).physicalAssets : "",
      InvestorPreference: businessData3? JSON.parse(businessData3).investorPreference : "",
      BusinessImage: "",
      BusinessDocument : "",
      BusinessProof: "",
      InvestmentRangeStart : values.minval? values.minval : 0,
      InvestmentRangeEnd: values.maxval? values.maxval :10000,
      State: businessData1? JSON.parse(businessData1).state : "",
      district: businessData1? JSON.parse(businessData1).district : "",
      Pincode : businessData1? JSON.parse(businessData1).Pincode : "",
      phone:"9882234285"
    }
    console.log(data1)
    const data = await axios.post('https://backend.pehlastake.com/business', 
     data1,
    {
       headers: {
         'Authorization': `Bearer=${token}`,
         'Content-Type': 'application/json',
       }})
    setDataToLocalStorage("InvestorData" , JSON.stringify(data))
    return data
}


export async function verifiedBusiness() {
  const data = await axios.get('https://backend.pehlastake.com/business/nonverified')
  
  return data.data
}

export async function getBusiness(id:any){
  console.log(id)
  const data = await axios.get('https://backend.pehlastake.com/business/one',
   { params: {
      id: id,
    },
  }
  )
  console.log(data.data)
  return data.data  
}

export async function delBusiness(id:any){
  const data = await axios.put('https://backend.pehlastake.com/business',{
    isBanned: true,
  
  },
  { params: {
    id: id,
  }})

  return data.data
}

export async function updateBusiness(id:any){
  const data = await axios.put('https://backend.pehlastake.com/business',{
    isVerified: true,
  
  },
  { params: {
    id: id,
  }})

  return data.data
}

export async function hideBusiness(id:any){
  const data = await axios.put('https://backend.pehlastake.com/business',{
    isVerified: false,
  },
  { params: {
    id: id,
  }})

  return data.data
}

export async function getAllBusiness(){
  const data = await axios.get('https://backend.pehlastake.com/business')
  return data.data
}

