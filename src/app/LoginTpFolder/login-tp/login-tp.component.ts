import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginTpService } from '../login-tp.service';
import { } from '@angular/router'
import { NavigationExtras } from '@angular/router'
import { format } from 'url';


@Component({
  selector: 'app-login-tp',
  templateUrl: './login-tp.component.html',
  styleUrls: ['./login-tp.component.css']
})
export class LoginTpComponent implements OnInit {
  tp: any;

  date: Date;
  tpdata: any;
  constructor(private route: ActivatedRoute, private router: Router, private logintpservice: LoginTpService) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get("dynamicParameter");
    this.logintpservice.getTimeTp(id).then(
      (resp) => {
        this.tpdata = resp.data;
        this.tp = resp.data[0]; console.log(this.tp);
        let reserveDate = JSON.parse(this.tp[("debut")]) / 1000
        let actuelleDate = (Date.parse(new Date().toString()) / 1000)
        if (reserveDate == actuelleDate) {
          this.router.navigateByUrl('/login');
        }

      })
  }
  gotoInterface() {
    this.router.navigateByUrl('http://laptop-nt0ejggt:8000/Untitled%20Project%203.lvproj_My%20Computer_add.html');
  }

}