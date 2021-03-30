import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AjoutComponent } from 'src/app/message/ajout/ajout.component';
import { Devoir } from 'src/app/model/devoir.model';
import { Eleve } from 'src/app/model/eleve.model';
import { Matiere } from 'src/app/model/matiere.model';
import { DevoirService } from 'src/app/shared/devoir.service';
import { EleveService } from 'src/app/shared/eleve.service';
import { MatiereService } from 'src/app/shared/matiere.service';

@Component({
  selector: 'app-devoir-ajout',
  templateUrl: './devoir-ajout.component.html',
  styleUrls: ['./devoir-ajout.component.css', '../../../assets/css/material-dashboard.css?v=2.1.2']
})
export class DevoirAjoutComponent implements OnInit {
  eleves: Eleve[];
  matieres: Matiere[];
  nomEleve = "";
  mail = "";
  dateNaissance = "";
  photoEleve = "";
  nomMatiere = "";
  photoMatiere = "";
  professeur = "";
  photoProfesseur= "";
  remarque = "Aucun";
  note = -1;
  noteTxt = "Pas encore de note";
  mention = "";
  nomDevoir = "";

  constructor(private eleveService: EleveService,
    private matiereService: MatiereService,
    private datePipe: DatePipe,
    private devoirService: DevoirService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getEleves();
    this.getMatieres();
  }

  getEleves(){
    this.eleveService.getEleves()
      .subscribe(data => {
        this.eleves = data;        
      });
  }

  getMatieres(){
    this.matiereService.getMatieres()
      .subscribe(data => {
        this.matieres = data;        
      });
  }

  changementEleve(idEleve){
    this.eleveService.getEleveById(idEleve)
      .subscribe(data => {
        this.nomEleve = data.nom;
        this.mail = data.mail;
        this.dateNaissance = this.datePipe.transform(data.dateNaissance ,"dd/MM/YYYY");
        this.photoEleve = data.photo
      });
  }

  changementMatiere(idMatiere){
    this.matiereService.getMatiereById(idMatiere)
      .subscribe(data => {
        this.nomMatiere = data.nom;
        this.photoMatiere = data.photoMatiere;
        this.professeur = data.professeur;
        this.photoProfesseur = data.photoProfesseur;
      });
  }

  mentionEleve(event){
    let note = event.target.value;
    this.mention = this.devoirService.mentionEleve(note);
  }

  retour(){
    this.router.navigate(["/devoirs"]);
  }

  ajoutDevoir(event){
    // on va modifier l'assignment
    // if((!this.nom) || (!this.dateDeRendu)) return;

    var idEleve = (document.getElementById("idEleve")) as HTMLSelectElement;
    var selectEleve = idEleve.selectedIndex;
    var optionEleve = idEleve.options[selectEleve];
    var idAuteur = optionEleve.value;
    var nomEleve = optionEleve.text;
    console.log("eleve: "+idAuteur+" - "+nomEleve+" - "+this.mail+" - "+this.dateNaissance+" - "+this.photoEleve);

    var idMatiere = (document.getElementById("idMatiere")) as HTMLSelectElement;
    var selectMatiere = idMatiere.selectedIndex;
    var optionMatiere = idMatiere.options[selectMatiere];
    var idMatiereValeur = optionMatiere.value;
    var nomMatiere = optionMatiere.text;

    console.log("matiere: "+idMatiereValeur+" - "+nomMatiere+" - "+this.photoMatiere+" - "+this.professeur+" - "+this.photoProfesseur);

    if(this.noteTxt === "Pas encore de note"){
      this.note = -1;
    }
    else{
      this.note = Number(this.noteTxt);
    }
    console.log("autre: "+this.remarque+" - "+this.note);

    var nouveauDevoir = new Devoir();
    
    nouveauDevoir.auteur = new Eleve();
    nouveauDevoir.auteur._id = idAuteur;
    nouveauDevoir.auteur.nom = nomEleve;
    nouveauDevoir.auteur.mail = this.mail;
    nouveauDevoir.auteur.dateNaissance = new Date(this.dateNaissance);
    nouveauDevoir.auteur.photo = this.photoEleve;

    nouveauDevoir.matiere = new Matiere();
    nouveauDevoir.matiere._id = idMatiereValeur;
    nouveauDevoir.matiere.nom = nomMatiere;
    nouveauDevoir.matiere.photoMatiere = this.photoMatiere;
    nouveauDevoir.matiere.professeur = this.professeur;
    nouveauDevoir.matiere.photoProfesseur = this.photoProfesseur;
    
    nouveauDevoir.remarque = this.remarque;
    nouveauDevoir.note = this.note;
    if(nouveauDevoir.note >= 0){
      nouveauDevoir.rendu = true;
      nouveauDevoir.dateDeRendu = new Date();
    }
    else{
      nouveauDevoir.rendu = false;
    }
    nouveauDevoir.nomDevoir = this.nomDevoir;

    this.devoirService.ajouterDevoir(nouveauDevoir)
      .subscribe(message => {
        console.log(message);
        this.snackBar.openFromComponent(AjoutComponent, {
          duration: 5000,
        });
     });
  }

}
