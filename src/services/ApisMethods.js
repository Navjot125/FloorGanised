const {
  ApiNonAuthFormData,
  ApiNonAuth,
  ApiAuth,
  ApiAuthFormData,
} = require('./Config');

export const PostApi = async (url, param) => {  
  try {
    const response = await ApiNonAuth.post(url, param);
    return response.data;
  } catch (error) {
    console.error('Error in PostApi:', error);
    throw error;
  }
};

export const GetApi = async (url, params = {}) => {
  try {
    const response = await ApiNonAuth.get(url, {params});
    return response.data;
  } catch (error) {
    console.error('Error in GetApi:', error);
    throw error;
  }
};

export const PostApiFormData = async (url, param) => {
  try {
    const response = await ApiNonAuthFormData.post(url, param);
    return response;
  } catch (error) {
    console.error('Error in PostApiFormData:', error);
    throw error;
  }
};

export const GetApiFormData = async (url, param = {}) => {
  try {
    const response = await ApiNonAuthFormData.get(url, {param});
    return response;
  } catch (error) {
    console.error('Error in GetApiFormData:', error);
    throw error;
  }
};

export const AuthPostFormData = async (url, param) => {
  try {
    const response = await ApiAuthFormData.post(url, param);
    return response.data;
  } catch (error) {
    console.error('Error in AuthFormData:', error);
    throw error;
  }
};

export const AuthGetFormData = async (url, param = {}) => {
  try {
    const response = await ApiAuthFormData.get(url, {param});
    return response.data;
  } catch (error) {
    console.error('Error in AuthGetFormData:', error);
    throw error;
  }
};

export const authApiPost = async (url, param) => {
  try {
    const response = await ApiAuth.post(url, param);
    return response.data;
  } catch (error) {
    console.error('Error in authApiPost:', error);
    throw error;
  }
};

export const authApiGet = async (url, params = {}) => {
  try {
    const response = await ApiAuth.get(url, {params});
    return response.data;
  } catch (error) {
    console.error('Error in authApiGet:', error);
    throw error;
  }
};
