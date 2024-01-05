import AppURLS from '../appURLS';
import { CANCEL_SUBSCRIPTION, CREATE_CHECKOUT_SESSION, PAYMENTS } from '../endpoints';
import { useUserInfo } from './useUserInfos';

export const usePayments = () => {


  const {userInfo} = useUserInfo();
  
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
          user_email: userInfo?.username
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

  const cancelSubscription = async (subscription_id: string, email: string) => {
    try {
      const url = `${AppURLS.middlewareInformationURL}/${PAYMENTS}/${CANCEL_SUBSCRIPTION}`

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email : email,
          subscription_id: subscription_id
        })
      })

      return response;

    } catch (error) {
      
    }
  }

  return {
    createCheackoutSession,
    cancelSubscription
  };
};