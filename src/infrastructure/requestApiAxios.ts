import axios from "axios";
import { IRequesterApi } from "../shared/requestApi.interface";

export class RequesterApiAxios implements IRequesterApi {
  async requestImageData(url: string): Promise<any> {
    try {
      const reponse = await axios.get(url);
      return reponse.data;
    } catch (error) {
      return "Error: " + error;
    }
  }
  async requestBlobData(url: string): Promise<any> {
    try {
      const reponse = await axios.get(url, { responseType: "blob" });
      return reponse.data;
    } catch (error) {
      return "Error: " + error;
    }
  }

  async requestJsonData(url: string): Promise<any> {
    try {
      const reponse = await axios.get(url, { responseType: "json" });
      return reponse.data;
    } catch (error) {
      return "Error: " + error;
    }
  }
}
