import { Component } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../assets/css/material-dashboard.css?v=2.1.2'],
  styles: [`::ng-deep .active a{background-color:#9c27b0 !important;}`] 
})
export class AppComponent {
  //if token does not exist isLogged == false
  public username: string = sessionStorage.getItem('username');
  sessionConnecte = sessionStorage.getItem('token');
  active1 = "";
  active2 = "";
  active3 = "";
  active4 = "";
  active5 = "";

  constructor(
    private router: Router
  ){}

  ngOnInit() {
    this.active1 = "active";
    this.router.navigate(['/devoirs']);
  }

  public deconexion() {
    sessionStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });;
  }
  public actif1() {
      console.warn('ACTIVE 1', "mitovy amle tao am bdd le mdp");
      this.active1 = "active";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
  }
  public actif2() {
      console.warn('ACTIVE 2', "mitovy amle tao am bdd le mdp");
      this.active1 = "";
      this.active2 = "active";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
      
  }
  public actif3() {
      console.warn('ACTIVE 3', "mitovy amle tao am bdd le mdp");
      this.active1 = "";
      this.active2 = "";
      this.active3 = "active";
      this.active4 = "";
      this.active5 = "";
      
    }
    public actif4() {
      console.warn('ACTIVE 4', "mitovy amle tao am bdd le mdp");
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "active";
      this.active5 = "";
      
    }
    public actif5() {
      console.warn('ACTIVE 5', "mitovy amle tao am bdd le mdp");
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "active"; 
    }
}
