import { Component } from '@angular/core';
import {Router} from "@angular/router"
import { LoginService } from '../app/shared/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  //if token does not exist isLogged == false

  public isLogged: boolean;
  public username: string;

  constructor(
    private router: Router,
    public loginService: LoginService,
    ) { }

  ngOnInit() {
    console.warn('getSession', sessionStorage.getItem('token'));
    if(sessionStorage.getItem('token')){
      console.warn('ATO', "result2.data.name");
      this.isLogged = true;
      this.username = sessionStorage.getItem('username');
      this.loginService.getData().subscribe(
        result2 => {
          if(result2){          
            console.warn('TEST getDATA YES', result2.data.name);
          }
          else{
            console.warn('TEST getDATA NO', "No token match");
          }
        }
      );
    }
  }
  public deconexion() {
    sessionStorage.clear();
    this.isLogged = false;
    this.router.navigate(['/']);
  }
}
