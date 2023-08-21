import axios from "axios";
import AppURLS from "../../components/appURLS";
import { AUTH_REGISTRATION_ENDPOINT } from "../../components/endpoints";


type SignUpProps = {
    email: string;
    password: string;
    selectedCountry: string
    status: string
}

const signUp = async(body: SignUpProps) => {


    try {
      const response = await axios.post(
        `${AppURLS.middlewareInformationURL}/${AUTH_REGISTRATION_ENDPOINT}/`,
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