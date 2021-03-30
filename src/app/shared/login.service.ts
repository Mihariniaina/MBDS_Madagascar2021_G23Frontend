import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:8010/api/users";
  //uri = "https://mbdsmadagascar2021g23backend.herokuapp.com/api/eleves";

  configUrl = "http://localhost:8010/api/login";
  //configUrl = "https://mbdsmadagascar2021g23backend.herokuapp.com/api/login";

  getItems(): String {
    return "hero";
  }

  getUsers():Observable<User[]> {
    return this.http.get<User[]>(this.uri);
  }

  issetUsers(username: String):Observable<User> {
    // if(this.http.get<User[]>(this.uri) == null){
    //   return false;
    // }
    // return true;
    //get valiny hoe misy anle username ve am back sa tsia?
    this.uri = "http://localhost:8010/api/users/"+username;
    return this.http.get<User>(this.uri)
  }

  getToken(id: string, name: string, mail: String, password: string): Observable<any> {
    return this.http.post<any>(this.configUrl, //do post with the argument to hidde
        { 
          id: id,
          name: name,
          mail: mail,
          password: password 
        });
  }

}
