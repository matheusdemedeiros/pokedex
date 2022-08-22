export interface IRequesterApi {
  requestJsonData(url:string): Promise<any>;
  requestBlobData(url:string): Promise<any>;
  requestImageData(url:string):Promise<any>;
}
