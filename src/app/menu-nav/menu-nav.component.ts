import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {TokenStorageService} from '../AuthentificationFolder/service/token-storage.service'
@Component({
  selector: 'app-menu-nav',
  templateUrl: './menu-nav.component.html',
  styleUrls: ['./menu-nav.component.css']
})
export class MenuNavComponent implements OnInit {
  currentUser: any;
  constructor(private token: TokenStorageService, private tokenStorageService: TokenStorageService , private router: Router) { }

  ngOnInit() {

    this.currentUser = this.token.getUser();
  }
  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  gotoHome()
  {
    
    this.router.navigateByUrl('/login');
  }
}
