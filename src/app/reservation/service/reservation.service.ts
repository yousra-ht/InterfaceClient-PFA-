import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { TokenStorageService } from 'src/app/AuthentificationFolder/service/token-storage.service';
import { resolve } from 'url';
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  url_TPData = "http://localhost:8090/BackendInterfaceClientApplication/api/v4/dataTP/"
  baseUrl = "http://localhost:8090/BackendInterfaceClientApplication/api/v2/reservation"

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }




  async newreservation(reservation) {
    const token = this.tokenStorage.getToken();
    return await axios.post(this.baseUrl, reservation, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }



  async getAllreservation() {
    const token = this.tokenStorage.getToken();
    // return await axios.get(`${this.baseUrl}`)
    return await axios.get(`${this.baseUrl}`, {
      headers: {
        Authorization: 'Bearer ' + token //the token is a variable which holds the token
      }
    })
  }
  async getTPdata(id) {

    const token = this.tokenStorage.getToken();
    return await axios.get(`${this.url_TPData}` + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })

  }

}
