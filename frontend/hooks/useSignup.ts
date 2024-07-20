import axios from 'axios'

export async function SignUp(values: any) {
    const data = await axios.post('http://backend.pehlastake.com/signup', 
     {
        phone :  values.phone,
        password : values.password

    })
    return data
}

