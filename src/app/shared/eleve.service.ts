import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleve } from '../model/eleve.model';

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  constructor(private http: HttpClient) { }

  //uri = "http://localhost:8010/api/eleves";
  uri = "https://mbdsmadagascar2021g23backend.herokuapp.com/api/eleves";

  getEleves():Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.uri);
  }
}
