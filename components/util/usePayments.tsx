
import { useContext } from 'react';
import AppURLS from '../appURLS';
import { CREATE_CHECKOUT_SESSION, PAYMENTS } from '../endpoints';
import { AuthContext } from '../../hooks/auth/AuthContext';

export const usePayments = () => {

  const {userInfos} = useContext(AuthContext)

  const createCheackoutSession = async (priceId: string) => {
    try {
      const url = `${AppURLS.middlewareInformationURL}/${PAYMENTS}/${CREATE_CHECKOUT_SESSION}`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          priceId: priceId,
          user_email: userInfos?.username
         }),
      });


      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        const checkoutUrl = responseData.checkout; // Extract the checkout URL
        return checkoutUrl;
      } else {
        // Handle error responses if needed
        console.error('Error:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  return {
    createCheackoutSession
  };
};