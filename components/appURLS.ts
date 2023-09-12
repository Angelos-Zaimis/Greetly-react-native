import Constants from 'expo-constants';

const middlewareInformationURL =
  Constants.manifest?.extra?.middlewareInformationURL ?? '';


const AppURLS = {
  middlewareInformationURL,
};

export default AppURLS;