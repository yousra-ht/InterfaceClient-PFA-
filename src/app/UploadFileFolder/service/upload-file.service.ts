import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import axios from 'axios';
import { TokenStorageService } from 'src/app/AuthentificationFolder/service/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  url_TP = 'http://localhost:8090/BackendInterfaceClientApplication/api/v2/checktime'
  baseUrl = "http://localhost:8090/BackendInterfaceClientApplication/api/v3/upload"
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }

  async getTp(id) {
    const token = this.tokenStorage.getToken();
    return await axios.get(`${this.url_TP}` + "/" + id, {
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
  }

}

