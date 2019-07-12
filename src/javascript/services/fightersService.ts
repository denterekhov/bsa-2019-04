import { callApi } from '../helpers/apiHelper';

class FighterService {
  async getFighters() {
    try {
      const endpoint = 'fighters.json';
      const apiResult = await callApi(endpoint, 'GET');
      return JSON.parse(atob(apiResult.content));
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(_id: number) {
    const endpoint = `details/fighter/${_id}.json`;
    const apiResult = await callApi(endpoint, 'GET');
    return JSON.parse(atob(apiResult.content));
  }
}

export const fighterService = new FighterService();
