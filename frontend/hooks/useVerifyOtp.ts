import axios from 'axios'

export async function verifyphone(phone: any, otp: any) {
    console.log(phone, otp)
    const data = await axios.post('https://backend.pehlastake.com/verify', 
     {
        phone,
        token: otp

    })
    return data
}

export async function resendOTP(phone: any) {
   console.log(phone)
   const data = await axios.post('https://backend.pehlastake.com/resend', 
    {
       phone,
   })
   return true
}