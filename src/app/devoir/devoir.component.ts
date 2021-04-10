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
  eleves: Eleve[];
  devoirs: Devoir[];
  etat = "";
  test;
  resourcesLoaded = true;
  nbDevoirsRendus: any[] = [];
  nbDevoirsRendusParEleves: any[] = [];
  moyennesEleve: any[] = [];
  nomEleves: string[];

  //bar
  barChartType: ChartType = 'bar';
  barChartLabels: string[] = []
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  //affichageDevoir = false;



  constructor(private devoirService: DevoirService, 
              private fonctionService: FonctionService,
              private eleveService: EleveService) { }

  ngOnInit(): void {
    this.etat = "rendus";
    this.getDevoirsRendus();
    this.getEleves();
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
      . subscribe(data => {
        var mydevoir: any[] = [];
        this.eleves = data;  
        this.devoirService.getNbDevoirRenduEleve2().subscribe(dataNbDevoir2 => {
        var tailleEleves = this.eleves.length;  
        for(var i = 0; i < tailleEleves; i++){
            //name to bar
            this.barChartLabels[i] = dataNbDevoir2[i]._id;
            //nbdevoir to bar
            mydevoir[i] = dataNbDevoir2[i].resultat;
          }
          this.barChartData = [
            { data: mydevoir, label: 'Dévoirs rendus' }
          ];
        });
        this.resourcesLoaded = false;
      });
  }
}
