import axios from 'axios'
import { getDataFromLocalStorage, setDataToLocalStorage } from "@/utils/functions";
export async function createUser(values: any) {
    const data = await axios.post('http://127.0.0.1:8000/user', 
     {
        phoneNumber :  `+91${values.phone}`,
        password : values.password,
        email: values.email,
        FullName : values.name

    })
    console.log(data)
    setDataToLocalStorage("userData" , JSON.stringify(data))
    return data
}

export async function updateUser(values : any){
       const userID = getDataFromLocalStorage('userID')
       const token = getDataFromLocalStorage('access_token0')
    const data = await axios.put(`http://127.0.0.1:8000/user/${userID}`, {
         shortBio: values.shortBio, 
         IDCard : "cardURL",
         Address: values.address,
    },
     {
        headers: {
          'Authorization': `Bearer=${token}`,
          'Content-Type': 'application/json',
        },
})
    console.log(data)
    return data
}

export async function updateuser2(role: string){
    const userID = getDataFromLocalStorage('userID')
       const token = getDataFromLocalStorage('access_token0')
    const data = await axios.put(`http://127.0.0.1:8000/user/${userID}`, {
        userRole: role,
    },
     {
        headers: {
          'Authorization': `Bearer=${token}`,
          'Content-Type': 'application/json',
        },
})
    console.log(data)
    return data
}