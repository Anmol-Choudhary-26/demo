import axios from 'axios'

export async function SignUp(values: any) {
    const data = await axios.post('https://travelbuddy-backend-gxl9.onrender.com/signup', 
     {
        phone :  values.phone,
        password : values.password

    })
    return data
}

