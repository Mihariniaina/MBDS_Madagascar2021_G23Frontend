import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router} from "@angular/router"
import { LoginService } from '../shared/login.service';
import * as bcrypt from 'bcryptjs'; 
import { User } from '../model/user.model';
import { AppComponent } from '../app.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', '../../assets/css/material-dashboard.css?v=2.1.2'],
  styles: [`::ng-deep .light-gray{background-image: url(./assets/img/back.jpg); background-repeat: no-repeat; background-size: 100%;}`]
})
export class LoginComponent implements OnInit {
  resourcesLoaded = false;
  checkoutForm: FormGroup;
  submitted = false;
  userLog: User
  user = "";
  formPass = "";
  dbPass = "";
  pass = "";
  
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private appComponent: AppComponent
    ) { }

  ngOnInit() {
    this.checkoutForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  get f() {
    return this.checkoutForm.controls;
  }
  
  onSubmit(): void {
    this.resourcesLoaded = true;
    this.submitted = true;

    if (this.checkoutForm.invalid) {
      return;
    }
    //get form
    this.formPass = this.checkoutForm.get('password').value;
    this.user = this.checkoutForm.get('username').value;
    //this.pass = bcrypt.hashSync('rilahmdp', 10);
    //mamerina user na mamerina null 
    

    //if select where username & mdpn misy sady marina dia get token en string
    this.loginService.issetUsers(this.user)
    .subscribe(
      result => {
          if (result) { //misy ao am base ilay username
            //get dataPass(encripted)
            this.dbPass = result.password;
            console.warn('ITO1', "misy ao am bdd =>"+this.dbPass);

            //compare formPass, with dataHashPash
            //console.warn('Hash', this.pass);

            //compare hass
            bcrypt.compare(this.formPass, this.dbPass).then(validPass => {
              // validPass returns true or false
              if(validPass) {
                console.warn('YES', "mitovy amle tao am bdd le mdp");
                //service.get token for this user
                this.loginService.getToken(result._id, result.name, result.mail, result.password).subscribe(
                  result2 => {
                    if(result2){
                      console.warn('YES2', result2.token);
                      //add token to session
                      sessionStorage.setItem('token', result2.token);
                      sessionStorage.setItem('username', result.name);
                      this.appComponent.username = result.name;
                      this.router.navigate(['/devoirs']).then(() => {
                        window.location.reload();
                      });
                    }
                    else{
                      console.warn('NO', "No token match");
                    }
                  }
                )
                
                //redirect to app.components and set isLogged = true
              }
              else{
                console.warn('NO', "Password invalide");
                
              }
            });
          }
          else {
              // do something
              console.warn('TSIZY', "Tsy misy ao am bdd akory le username io");

          }
      },
      error => {
          console.log("EE:",error);
      }
    );

    //this.checkoutForm.reset();
  }
}
