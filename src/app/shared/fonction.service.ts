import { Injectable } from '@angular/core';
import { Devoir } from '../model/devoir.model';
import { Eleve } from '../model/eleve.model';
import { Matiere } from '../model/matiere.model';
import { DevoirService } from './devoir.service';
import { EleveService } from './eleve.service';
import { MatiereService } from './matiere.service';

@Injectable({
  providedIn: 'root'
})
export class FonctionService {

  constructor(private eleveService: EleveService,
              private matiereService: MatiereService,
              private devoirService: DevoirService) { }

  insertion500Devoirs(){
    var i = 0;
    var eleves: Eleve[];
    var matieres: Matiere[];
    var devoirServiceTemp = this.devoirService;
    this.eleveService.getEleves().subscribe(data => {
      eleves = data;
      console.log("j ai récupéré les élèves: "+eleves);

      this.matiereService.getMatieres().subscribe(data => {
        matieres = data;
      });
    });
    setTimeout(function(){
      while(i<500){
        console.log("je passe dans la boucle "+i);
        var nouveauDevoir = new Devoir();
          
        let nbEleve = eleves.length;
        let indiceAleatoireEleve = entierAleatoire(0, nbEleve-1); 
        let eleve = eleves[indiceAleatoireEleve]; 
        nouveauDevoir.auteur = new Eleve();     
        nouveauDevoir.auteur = eleve;    
    
        let nbMatiere = matieres.length;
        let indiceAleatoireMatiere = entierAleatoire(0, nbMatiere-1); 
        let matiere = matieres[indiceAleatoireMatiere];
        nouveauDevoir.matiere = new Matiere();
        nouveauDevoir.matiere = matiere;
    
        nouveauDevoir.remarque = "Aucun";
        nouveauDevoir.note = entierAleatoire(-1, 20);
        if(nouveauDevoir.note >= 0){
          nouveauDevoir.rendu = true;
          nouveauDevoir.dateDeRendu = new Date();
        }
        else{
          nouveauDevoir.rendu = false;
        }
        let numTP = entierAleatoire(1, 15);
        nouveauDevoir.nomDevoir = "TP "+numTP;
  
        //console.log("indice "+i+" : eleve: "+nouveauDevoir.auteur.nom+" - matiere: "+nouveauDevoir.matiere.nom+" - prof: "+nouveauDevoir.matiere.professeur+" - rendu: "+nouveauDevoir.rendu+ " - nom devoir: "+nouveauDevoir.nomDevoir);
        devoirServiceTemp.ajouterDevoir(nouveauDevoir).subscribe(message => {
          console.log(message);
        });
        i++;
      }
    }, 5000);
  }
}

function entierAleatoire(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}  

