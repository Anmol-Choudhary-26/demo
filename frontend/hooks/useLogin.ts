import { setDataToLocalStorage } from '@/utils/functions'
import axios from 'axios'

export async function SingIn(phone: any, password: any) {
    console.log(phone, password)
    const data = await axios.post('http://127.0.0.1:8000/login', 
     {
        phone:`${phone}`,
        password

    })

    return data
}

