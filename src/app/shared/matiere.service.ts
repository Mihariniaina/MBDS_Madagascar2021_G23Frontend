import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matiere } from '../model/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:8010/api/matieres";
  //uri = "https://mbdsmadagascar2021g23backend.herokuapp.com/api/matieres";

  getMatieres():Observable<Matiere[]> {
    return this.http.get<Matiere[]>(this.uri);
  }
}
