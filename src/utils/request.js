import checkResponse from './checkResponse';

const request = async (endpoint, options) => {
  const baseUrl = 'https://norma.nomoreparties.space/api';

  const res = await fetch(`${baseUrl}/${endpoint}`, options);
  return checkResponse(res);
}

export default request;