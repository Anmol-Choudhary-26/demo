import { setDataToLocalStorage } from '@/utils/functions'
import axios from 'axios'

export async function SingIn(phone: any, password: any) {
    console.log(phone, password)
    const data = await axios.post('https://backend.pehlastake.com/login', 
     {
        phone:`${phone}`,
        password

    })

    return data
}

