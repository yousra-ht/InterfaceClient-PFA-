import { Injectable } from '@angular/core';
import { TokenStorageService } from '../AuthentificationFolder/service/token-storage.service';
import axios from 'axios';
@Injectable({
  providedIn: 'root'
})
export class LoginTpService {
  url_Time = 'http://localhost:8090/BackendInterfaceClientApplication/api/v2/checktime'
  constructor(private tokenStorage: TokenStorageService) { }


  async getTimeTp(id) {
    const token = this.tokenStorage.getToken();
    return await axios.get(`${this.url_Time}` + "/" + id, {
      headers: {
        Authorization: 'Bearer ' + token
      } })
  }

}
