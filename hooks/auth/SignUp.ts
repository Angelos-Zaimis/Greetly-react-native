import axios from "axios";


type SignUpProps = {
    email: string;
    password: string;
    selectedCountry: string
    status: string
}

const signUp = async(body: SignUpProps) => {


    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/auth/registration/',
        body,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        );
        
    
        return response
        
      } catch (error: any) {
        return error.response.data
      }


  }


export default signUp