import { Component, OnInit } from '@angular/core';
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
  nbDevoirsRendus: number[] = [];
  moyennesEleve: number[] = [];

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
          .subscribe(dataNbDevoir=> {  
            this.nbDevoirsRendus.push(dataNbDevoir); 
          });
          
          // moyenne eleve
          this.eleveService.getMoyenneEleve(idEleve)
          .subscribe(dataMoyenne => { 
            var moyennes = dataMoyenne[0].moyenne;
            this.moyennesEleve.push(moyennes);
          });
        }

        this.resourcesLoaded = false;
      });
  }
}
