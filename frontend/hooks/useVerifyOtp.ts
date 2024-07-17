import axios from 'axios'

export async function verifyphone(phone: any, otp: any) {
    console.log(phone, otp)
    const data = await axios.post('http://127.0.0.1:8000/verify', 
     {
        phone,
        token: otp

    })
    return data
}

