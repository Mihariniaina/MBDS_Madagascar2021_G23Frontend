import { HttpClient } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Eleve } from '../model/eleve.model';
import { Aggregate } from '../model/aggregate.model';

@Injectable({
  providedIn: 'root'
})
export class EleveService {

  constructor(private http: HttpClient) { }

  //uri = "http://localhost:8010/api/eleves";
  uri = "https://mbdsmadagascar2021g23backend.herokuapp.com/api/eleves";

  //uriSingulier = "http://localhost:8010/api/eleve/";
  uriSingulier = "https://mbdsmadagascar2021g23backend.herokuapp.com/api/eleve/";

  //uriMoyenne = "http://localhost:8010/api/eleve/moyenne/";
  uriMoyenne = "https://mbdsmadagascar2021g23backend.herokuapp.com/api/eleve/moyenne/";

  getMoyenneEleve(id: string):Observable<Aggregate> {
    return this.http.get<Aggregate>(this.uriMoyenne+id);
  }

  getEleves():Observable<Eleve[]> {
    return this.http.get<Eleve[]>(this.uri);
  }

  getEleveById(id: string): Observable<Eleve>{
    return this.http.get<Eleve>(this.uriSingulier+id)
  }
}
