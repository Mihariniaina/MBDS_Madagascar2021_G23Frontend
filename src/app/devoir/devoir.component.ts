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
  resourcesLoaded = true;
  nbDevoirsRendus: any[] = [];
  nbDevoirsRendusParEleves: any[] = [];
  moyennesEleve: any[] = [];
  nomEleves: string[];
  texteTitre2 = "Nombre des devoirs rendus pour chaque élève";

  //bar
  texteTitre = "";
  barChartType: ChartType = 'horizontalBar';
  barChartLabels: string[] = []
  barChartLegend = true;
  barChartPlugins = [];
  barChartData: ChartDataSets[] = [];
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  chartColors = [
    {
      backgroundColor: '#ae14c9',
      borderColor: '#89229b',
      borderWidth: 2,
    }
  ]
  //affichageDevoir = false;



  constructor(private devoirService: DevoirService, 
              private fonctionService: FonctionService,
              private eleveService: EleveService) { }

  ngOnInit(): void {
    this.etat = "rendus";
    this.getDevoirsRendus();
    this.getNbDevoirsGroupByEleve(true);
    //this.fonctionService.insertion500Devoirs();
  }

  getDevoirsRendus(){
    this.texteTitre2 = "Nombre des devoirs rendus pour chaque élève";
    this.getNbDevoirsGroupByEleve(true);
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
    this.texteTitre2 = "Nombre des devoirs non rendus pour chaque élève";
    this.getNbDevoirsGroupByEleve(false);
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


  getNbDevoirsGroupByEleve(estRendu: boolean){
    this.eleveService.getEleves()
      . subscribe(data => {
        var mydevoir: any[] = [];
        this.eleves = data;  
        this.devoirService.getNbDevoirRenduOuNonGroupByEleve(estRendu).subscribe(dataNbDevoir2 => {
          console.log("estRendu: "+estRendu);
          var tailleEleves = this.eleves.length;  
          for(var i = 0; i < tailleEleves; i++){
            //name to bar
            this.barChartLabels[i] = dataNbDevoir2[i]._id;
            //nbdevoir to bar
            mydevoir[i] = dataNbDevoir2[i].resultat;
          }
          if(estRendu) this.texteTitre = "Nombre de devoirs rendus";
          else this.texteTitre = "Nombre de devoirs non-rendus";
          this.barChartData = [
            { data: mydevoir, label: this.texteTitre }
          ];
        });
        //this.resourcesLoaded = false;
      });
  }
}
