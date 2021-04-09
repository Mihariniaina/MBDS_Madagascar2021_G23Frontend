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
        var x: any[] = [];
        //nb devoir rendu
        var mydata = [];
        this.eleves = data;    
        var tailleEleves = this.eleves.length;
        console.log("mipoitra 0");
        var j = -1;

        this.devoirService.getNbDevoirRenduEleve2().subscribe(dataNbDevoir2 => {
          // j++;
          //this.nbDevoirsRendus[dataNbDevoir._id] = dataNbDevoir.resultat;
          // this.nbDevoirsRendusParEleves[j] = dataNbDevoir.resultat;
          mydata = dataNbDevoir2;
          console.log("Mipoitra 2=="+mydata[0].resultat);
        });

        for(var i = 0; i < tailleEleves; i++){
          var idEleve = this.eleves[i]._id;
          x[i] = this.eleves[i]._id;
          //name to bar
          console.log("Mipoitra 1");
          this.barChartLabels[i] = this.eleves[i].nom;
          this.devoirService.getNbDevoirRenduEleve(idEleve)
          .subscribe(dataNbDevoir => {
            // j++;
            // //this.nbDevoirsRendus[dataNbDevoir._id] = dataNbDevoir.resultat; 
            // this.nbDevoirsRendusParEleves[j] = dataNbDevoir.resultat;
            // console.log("Mipoitra 2=="+dataNbDevoir._id);
          });
          // console.log("Mipoitra 3");
          // x = [8,2,3,4,5,6,9];
        }
        //console.log("hehe=" + this.nbDevoirsRendusParEleves[0]);
        //console.log("Mipoitra 4+");
        
        this.barChartData = [
          { data: [8,2,3,4,5,6,7], label: 'Dévoirs rendus' }
        ];
        //console.log("Mipoitra 5="+this.barChartData);
        this.resourcesLoaded = false;
      });
  }
}
