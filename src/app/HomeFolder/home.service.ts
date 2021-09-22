import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { TokenStorageService } from '../AuthentificationFolder/service/token-storage.service';
import { UserService } from '../AuthentificationFolder/service/user.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  url_Time = 'http://localhost:8090/BackendInterfaceClientApplication/api/v2/checktime'
  currentUser: any;
  url_tp = 'http://localhost:8090/BackendInterfaceClientApplication/api/v4/Tps'
  url_classe = 'http://localhost:8090/BackendInterfaceClientApplication/api/v4/classe'
  baseUrl = "http://localhost:8090/BackendInterfaceClientApplication/api/v2/reservation"
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService, private userService: UserService) { }
  async getreservation() {
    const token = this.tokenStorage.getToken();
    return await axios.get(`${this.baseUrl}`, {
      headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }
    })
  }

  async getClasse() {
    const token = this.tokenStorage.getToken();
    this.currentUser = this.tokenStorage.getUser();

    return await axios.get(`${this.url_classe}` + "/" + this.currentUser.id, {
      headers: {
        Authorization: 'Bearer ' + token
      }

    })
  }

  async getListTp(id) {
    const token = this.tokenStorage.getToken();
    return await axios.get(`${this.url_tp}` + "/" + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }

    })
  }



  async getTimeTp(id) {
    const token = this.tokenStorage.getToken();
    return await axios.get(`${this.url_Time}` + "/" + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }

    })
  }


}
