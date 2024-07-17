import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createFranchise(values: any){
    const token = getDataFromLocalStorage('access_token0')
    const businessData1 = getDataFromLocalStorage('FranchiseDetails')
    const businessData2 = getDataFromLocalStorage('FranchiseDetails2')
    const businessData3 = getDataFromLocalStorage('FranchiseDetails3')
   

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
      franchiseInfo : businessData2? JSON.parse(businessData2).businessInfo : "",
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
    const data = await axios.post('http://127.0.0.1:8000/franchise', 
     data1,
    {
       headers: {
         'Authorization': `Bearer=${token}`,
         'Content-Type': 'application/json',
       }})
    console.log(data)
    setDataToLocalStorage("FranchiseData" , JSON.stringify(data))
    return data
}
