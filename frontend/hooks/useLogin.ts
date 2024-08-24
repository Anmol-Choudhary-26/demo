import { setDataToLocalStorage } from '@/utils/functions'
import axios from 'axios'

export async function SingIn(email: any, password: any) {
    console.log(email, password)
    const data = await axios.post('https://backend.pehlastake.com/login', 
     {
        email,
        password

    })

    return data
}

export async function resetPassword(email: any) {
    const data = await axios.post('https://backend.pehlastake.com/resetpass', {
        email
    })
    return data
}

export async function adminLogin(phone: any, password: any) {
    const data = await axios.post('https://backend.pehlastake.com/adminlogin', 
        {
           phone,
           password
   
       })
   
       return data
}