import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  noteTxt = "";
  mention = "";

  constructor(private eleveService: EleveService,
    private matiereService: MatiereService,
    private datePipe: DatePipe,
    private devoirService: DevoirService,
    private router: Router) { }

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
    console.log("Ajout devoir en cours")
  }

}
