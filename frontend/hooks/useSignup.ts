import axios from 'axios'

export async function SignUp(values: any) {
    const data = await axios.post('http://127.0.0.1:8000/signup', 
     {
        phone :  values.phone,
        password : values.password

    })
    return data
}

