import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../../AuthentificationFolder/service/token-storage.service'
import { UserService } from '../../AuthentificationFolder/service/user.service'
import { ActivatedRoute } from '@angular/router'
import { HttpHeaders } from '@angular/common/http';
import { HomeService } from '../home.service';
import { Router } from '@angular/router'
import { async } from 'rxjs/internal/scheduler/async';
import faIR from 'date-fns/locale/fa-IR/index';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;
  public routerLinkVariable = "/reservation";
  public tp: any;
  public listTp: [];
  classe: any;
  id_classe;
  currentUser: any;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  constructor(private token: TokenStorageService, private userService: UserService,
    private homeservice: HomeService, private router: Router
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  content: string;
  async ngOnInit() {
    this.currentUser = this.token.getUser();
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data;
        this.isSuccessful = true;
        this.isSignUpFailed = false;

      },
      err => {
        this.content = JSON.parse(err.error).message;
      }

    );
    this.getClasse();




  }

  async getClasse() {
    return await this.homeservice.getClasse().then((resp) => { this.id_classe = resp.data
      , this.getTp(this.id_classe) });

  }

  getTp(classe) {
    this.homeservice.getListTp(classe).then((resp) => { this.listTp = resp.data, console.log(this.listTp) });

    err => {
      this.content = JSON.parse(err.error).message;
    }


  }

  checkTime(element) {

    let dynamicParameter = this.reserverIDTP1(element);
    this.router.navigate(['/LoginTp/' + dynamicParameter]);
    


  }
  gotoUpload(element)
  {
    let dynamicParameter = this.reserverIDTP1(element);
    this.router.navigate(['/upload/' + dynamicParameter]);
  }
  reserverIDTP(element) {

    let dynamicParameter = this.reserverIDTP1(element);
    this.router.navigate(['/reservation/' + dynamicParameter]);

  }

  reserverIDTP1(element) {
    let id: String;


    this.listTp.forEach(async (value, index) => {
      if (value == element) {

        id = JSON.parse(element[("tp_id")]);
      }

    })

    return id
  }

}




