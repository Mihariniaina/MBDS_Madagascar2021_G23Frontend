import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router"
import { DevoirRechercheComponent } from './devoir/devoir-recherche/devoir-recherche.component';
import { DevoirService } from './shared/devoir.service';

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
  texte = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private devoirService: DevoirService
  ){}

  ngOnInit() {
    this.active1 = "active";
    this.router.navigate(['/devoirs']);
  }

  recherche(){
    var texteATrasmettre = this.texte;  
    console.log("texteATrasmettre: "+this.texte);
    this.router.navigateByUrl('/devoirs', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/recherche', texteATrasmettre])
    );
    this.texte = "";
  }

  public deconexion() {
    sessionStorage.clear();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }

  public actif1() {
      this.active1 = "active";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
  }
  public actif2() {
      this.active1 = "";
      this.active2 = "active";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "";
      
  }
  public actif3() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "active";
      this.active4 = "";
      this.active5 = "";
      
    }
    public actif4() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "active";
      this.active5 = "";
      
    }
    public actif5() {
      this.active1 = "";
      this.active2 = "";
      this.active3 = "";
      this.active4 = "";
      this.active5 = "active"; 
    }
}
