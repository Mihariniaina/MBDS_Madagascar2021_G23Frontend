import { Component, OnInit } from '@angular/core';
import { Devoir } from '../model/devoir.model';
import { Eleve } from '../model/eleve.model';
import { DevoirService } from '../shared/devoir.service';
import { FonctionService } from '../shared/fonction.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { EleveService } from '../shared/eleve.service';
//import { Labels } from 'ng2-charts';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css', '../../assets/css/material-dashboard.css?v=2.1.2']
})
export class DevoirComponent implements OnInit {
  devoirs: Devoir[];
  etat = "";
  resourcesLoaded = true;
  eleves: Eleve[];
  nomEleves: string[];
  nbDevoirsRendus: any[] = [];
  //affichageDevoir = false;



  constructor(private devoirService: DevoirService, 
              private fonctionService: FonctionService,
              private eleveService: EleveService) { }

  ngOnInit(): void {
    this.getEleves();
    this.etat = "rendus";
    this.getDevoirsRendus();
    //this.fonctionService.insertion500Devoirs();
  }

  getDevoirsRendus(){
    //this.affichageDevoir = false;
    this.resourcesLoaded = true;
    this.etat = "rendus";
    this.devoirService.getDevoirsRendus()
      .subscribe(data => {
        this.devoirs = data;
        this.resourcesLoaded = false;
        //this.affichageDevoir = true;
      });
  }

  getDevoirsNonRendus(){
    //this.affichageDevoir = false;
    this.resourcesLoaded = true;
    this.etat = "non rendus";
    this.devoirService.getDevoirsNonRendus()
      .subscribe(data => {
        this.devoirs = data;
        this.resourcesLoaded = false;
        //this.affichageDevoir = true;
      });
  }

  getEleves(){
    this.eleveService.getEleves()
      .subscribe(data => {
        this.eleves = data;
        //nb devoir rendu
        var tailleEleves = this.eleves.length;
        for(var i = 0; i < tailleEleves; i++){
          //this.barChartLabels[i] = this.eleves[i].nom;
          var idEleve = this.eleves[i]._id;
          console.log("dadako");
          this.devoirService.getNbDevoirRenduEleve(idEleve)
          .subscribe(dataNbDevoir => {
            this.nbDevoirsRendus[dataNbDevoir._id] = dataNbDevoir.resultat; 
          });
        }

        this.resourcesLoaded = false;
      });
  }

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [this.nbDevoirsRendus.length, 5, 2, 10, 6, 7], label: 'Rendement des dévoirs' }
  ];
}
