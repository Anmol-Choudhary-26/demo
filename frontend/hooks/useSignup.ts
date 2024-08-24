import axios from 'axios'

export async function SignUp(values: any) {
    const data = await axios.post('https://backend.pehlastake.com/signup', 
     {
        email :  values.email,
        password : values.password,
        phoneNumber : values.phone,
        name: values.name, 

    })
    return data
}

