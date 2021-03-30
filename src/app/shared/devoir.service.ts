import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Devoir } from '../model/devoir.model';

@Injectable({
  providedIn: 'root'
})
export class DevoirService {

  constructor(private http: HttpClient) { }

  uri = "http://localhost:8010/api/devoirs/";
  //uri = "https://mbdsmadagascar2021g23backend.herokuapp.com/api/devoirs/";

  uriSingulier = "http://localhost:8010/api/devoir/";
  //uriSingulier = "https://mbdsmadagascar2021g23backend.herokuapp.com/api/devoir/";

  getDevoirsRendus():Observable<Devoir[]> {
    return this.http.get<Devoir[]>(this.uri+"rendus");
  }

  getDevoirsNonRendus():Observable<Devoir[]> {
    return this.http.get<Devoir[]>(this.uri+"nonRendus");
  }

  getDevoirById(id: string):Observable<Devoir> {
    return this.http.get<Devoir>(this.uriSingulier+id);
  }

  modifierDevoir(devoir: Devoir):Observable<any> {
    return this.http.put(this.uri, devoir);
  }

  ajouterDevoir(devoir: Devoir):Observable<any> {
    return this.http.post(this.uri, devoir);
  }

  mentionEleve(note: number){
    if(note == 20) return "Excellent"
    else if(note >= 16 && note < 20) return "Très bien";
    else if(note >= 14 && note < 16) return "Bien";
    else if(note >= 12 && note < 14) return "Assez-bien";
    else if(note >= 10 && note < 12) return "Passable";
    else if(note >= 6 && note < 10) return "Compensé";
    else if(note >= 0 && note < 6) return "Ajourné";
    else if(note < 0) return "Pas encore de note"
  }
}
