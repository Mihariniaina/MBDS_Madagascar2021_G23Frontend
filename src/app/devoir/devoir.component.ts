import { Component, OnInit } from '@angular/core';
import { Devoir } from '../model/devoir.model';
import { DevoirService } from '../shared/devoir.service';
import { FonctionService } from '../shared/fonction.service';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css', '../../assets/css/material-dashboard.css?v=2.1.2']
})
export class DevoirComponent implements OnInit {
  devoirs: Devoir[];
  etat = "";
  resourcesLoaded = true;
  
  constructor(private devoirService: DevoirService, 
              private fonctionService: FonctionService) { }

  ngOnInit(): void {
    this.etat = "rendus";
    this.getDevoirsRendus();
    //this.fonctionService.insertion500Devoirs();
  }

  getDevoirsRendus(){
    this.resourcesLoaded = true;
    this.etat = "rendus";
    this.devoirService.getDevoirsRendus()
      .subscribe(data => {
        this.resourcesLoaded = false;
        this.devoirs = data;
      });
  }

  getDevoirsNonRendus(){
    this.resourcesLoaded = true;
    this.etat = "non rendus";
    this.devoirService.getDevoirsNonRendus()
      .subscribe(data => {
        this.resourcesLoaded = false;
        this.devoirs = data;
      });
  }
}
