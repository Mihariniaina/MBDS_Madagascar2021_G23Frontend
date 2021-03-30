import { Component, OnInit } from '@angular/core';
import { Eleve } from '../model/eleve.model';
import { EleveService } from '../shared/eleve.service';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.css', '../../assets/css/material-dashboard.css?v=2.1.2']
})
export class EleveComponent implements OnInit {
  eleves: Eleve[];
  resourcesLoaded = true;

  constructor(private eleveService: EleveService) { }

  ngOnInit(): void {
    this.getEleves();
  }

  getEleves(){
    this.eleveService.getEleves()
      .subscribe(data => {
        this.resourcesLoaded = false;
        this.eleves = data;        
      });
  }
}
