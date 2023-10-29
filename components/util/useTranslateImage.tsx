import axios from 'axios';
import AppURLS from '../appURLS';
import { TRANSLATE_IMAGE_ENDPOINT } from '../endpoints';


const translationEndpoint = `${AppURLS.middlewareInformationURL}/${TRANSLATE_IMAGE_ENDPOINT}/`;

export const useImageTranslation = () => {


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

    return response?.config?.url;
 
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
  };

  return {
    translateImage,
  };
};
