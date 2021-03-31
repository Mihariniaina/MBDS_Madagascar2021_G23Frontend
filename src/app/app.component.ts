import { Component } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2']
  
  // styleUrls: ['./app.component.css']
})
export class AppComponent {
  //if token does not exist isLogged == false
  public username: string = sessionStorage.getItem('username');
  sessionConnecte = sessionStorage.getItem('token');

  constructor(
    private router: Router
  ){}

  public deconexion() {
    sessionStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });;
  }
}
