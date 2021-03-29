import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { Devoir } from 'src/app/model/devoir.model';
import { Eleve } from 'src/app/model/eleve.model';
import { Matiere } from 'src/app/model/matiere.model';
import { DevoirService } from 'src/app/shared/devoir.service';
import { EleveService } from 'src/app/shared/eleve.service';
import { MatiereService } from 'src/app/shared/matiere.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ModifierComponent } from 'src/app/message/modifier/modifier.component';

@Component({
  selector: 'app-devoir-details',
  templateUrl: './devoir-details.component.html',
  styleUrls: ['./devoir-details.component.css', '../../../assets/css/material-dashboard.css?v=2.1.2']
})
export class DevoirDetailsComponent implements OnInit {
  id = this.route.snapshot.params.id;
  devoir: Devoir;
  mention = "";
  eleves: Eleve[];
  mail = "";
  dateNaissance="";
  nomEleve = "";
  photoEleve = "";
  matieres: Matiere[];
  nomMatiere = ""
  photoMatiere = ""
  professeur = "";
  photoProfesseur = "";
  remarque = "";
  note = 0;
  noteTxt = "";
  estRendu: Boolean;

  constructor(private devoirService: DevoirService,
              private route: ActivatedRoute,
              private router: Router,
              private eleveService: EleveService,
              private datePipe: DatePipe,
              private matiereService: MatiereService,
              private snackBar: MatSnackBar){ }

  ngOnInit(): void {
    this.getDevoirById();
    this.getEleves();
    this.getMatieres();
  }

  getDevoirById(){
    this.devoirService.getDevoirById(this.id)
      .subscribe(data => {
        this.devoir = data;
        this.nomEleve = data.auteur.nom;
        this.mail = data.auteur.mail;
        this.dateNaissance = this.datePipe.transform(data.auteur.dateNaissance ,"dd/MM/YYYY");
        this.photoEleve = data.auteur.photo
        this.nomMatiere = data.matiere.nom;
        this.photoMatiere = data.matiere.photoMatiere;
        this.professeur = data.matiere.professeur;
        this.photoProfesseur = data.matiere.photoProfesseur;
        this.remarque = data.remarque;
        this.note = data.note;
        if(this.note < 0){
          this.noteTxt = "Pas encore de note";
        }
        else{
          this.noteTxt = String(this.note);
        }
        this.estRendu = data.rendu;
        this.mention = this.devoirService.mentionEleve(data.note);
      });
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

  retour(){
    this.router.navigate(["/devoirs"]);
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

  modifierDevoir(event) {
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

    this.devoir.auteur._id = idAuteur;
    this.devoir.auteur.nom = nomEleve;
    this.devoir.auteur.mail = this.mail;
    this.devoir.auteur.dateNaissance = new Date(this.dateNaissance);
    this.devoir.auteur.photo = this.photoEleve;
    this.devoir.matiere._id = idMatiereValeur;
    this.devoir.matiere.nom = nomMatiere;
    this.devoir.matiere.photoMatiere = this.photoMatiere;
    this.devoir.matiere.professeur = this.professeur;
    this.devoir.matiere.photoProfesseur = this.photoProfesseur;
    this.devoir.remarque = this.remarque;
    this.devoir.note = this.note;
    if(!this.estRendu && this.devoir.note >= 0){
      this.devoir.rendu = true;
      this.devoir.dateDeRendu = new Date();
    }

    this.devoirService.modifierDevoir(this.devoir)
      .subscribe(message => {
        console.log(message);
        this.snackBar.openFromComponent(ModifierComponent, {
          duration: 5000,
        });
      });
  }

  mentionEleve(event){
    let note = event.target.value;
    this.mention = this.devoirService.mentionEleve(note);
  }
}
