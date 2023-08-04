import { useContext } from 'react';
import useSWR from 'swr';
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';


const translationEndpoint = 'http://127.0.0.1:8000/api/translateImage/';

export const useImageTranslation = () => {

  const { data: translatedImage, error, mutate } = useSWR(null);

  const translateImage = async (imageData: { uri: string; }, targetLanguage: string) => {

    const formData = new FormData();
    formData.append('translatedImage', {
      uri: imageData.uri,
      type: 'image/jpeg', // Adjust the type accordingly if your image is not a JPEG.
      name: 'image.jpg',
    });
    formData.append('target_language', targetLanguage)

  try {
    const response = await axios.post(`${translationEndpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    mutate()
    console.log(response)
    return response.data;
 
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
  };

  return {
    translatedImage,
    error,
    translateImage,
  };
};
