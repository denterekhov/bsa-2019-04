import { callApi } from '../helpers/apiHelper';

class FighterService {
  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');
      const response = JSON.parse(atob(apiResult.content));
      console.log('response: ', response);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(_id: number) {
    const endpoint = `details/fighter/${_id}.json`;
    const apiResult = await callApi(endpoint, 'GET');
    const response = JSON.parse(atob(apiResult.content));
    console.log('response: ', response);
    return response;
  }
}

export const fighterService = new FighterService();
