import { Component, OnInit } from '@angular/core';
import { Aggregate } from '../model/aggregate.model';
import { Eleve } from '../model/eleve.model';
import { DevoirService } from '../shared/devoir.service';
import { EleveService } from '../shared/eleve.service';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css', '../../assets/css/material-dashboard.css?v=2.1.2']
})
export class EleveComponent implements OnInit {
  eleves: Eleve[];
  resourcesLoaded = true;
  nbDevoirsRendus: any[] = [];
  moyennesEleve: any[] = [];

  constructor(
    private eleveService: EleveService,
    private devoirService: DevoirService) { }

  ngOnInit(): void {
    this.getEleves();
  }

  getEleves(){
    this.eleveService.getEleves()
      .subscribe(data => {
        this.eleves = data;    
        
        //nb devoir rendu
        var tailleEleves = this.eleves.length;
        for(var i = 0; i < tailleEleves; i++){
          var idEleve = this.eleves[i]._id;
          this.devoirService.getNbDevoirRenduEleve(idEleve)
          .subscribe(dataNbDevoir => {  
            this.nbDevoirsRendus[dataNbDevoir._id] = dataNbDevoir.resultat; 
          });
          
          // moyenne eleve
          this.eleveService.getMoyenneEleve(idEleve)
          .subscribe(dataMoyenne => { 
            this.moyennesEleve[dataMoyenne._id] = dataMoyenne.resultat; 
            console.log("moyenne de "+dataMoyenne._id+" = "+this.moyennesEleve[dataMoyenne._id]);
          });
        }

        this.resourcesLoaded = false;
      });
  }
}
