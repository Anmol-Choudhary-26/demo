import axios from "axios";
import {
  getDataFromLocalStorage,
  setDataToLocalStorage,
} from "@/utils/functions";
export async function createUser(values: any) {
  const data = await axios.post("https://backend.pehlastake.com/user", {
    phoneNumber: `+91${values.phone}`,
    password: values.password,
    email: values.email,
    FullName: values.name,
  });
  console.log(data);
  setDataToLocalStorage("userData", JSON.stringify(data));
  return data;
}

export async function updateuser2(role: string) {
  const userID = getDataFromLocalStorage("userID");
  let personalData = localStorage.getItem("personalDetails") ;
  let bio = ""
  let address = ""
  if (personalData !== null) {
   const Data = JSON.parse(personalData); 
   bio = Data.bio 
   address = Data.address
  }

  const token = getDataFromLocalStorage("access_token0");
  const data = await axios.put(
    `https://backend.pehlastake.com/user/${userID}`,
    {
      userRole: role,
      shortBio: bio ,
      IDCard: "cardURL",
      Address: address ,
    },
    {
      headers: {
        Authorization: `Bearer=${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  console.log(data);
  return data;
}
