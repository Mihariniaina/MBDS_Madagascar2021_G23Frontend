import { Component, OnInit } from '@angular/core';
import { Matiere } from '../model/matiere.model';
import { MatiereService } from '../shared/matiere.service';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.css', '../../assets/css/material-dashboard.css?v=2.1.2']
})
export class MatiereComponent implements OnInit {
  matieres: Matiere[];
  resourcesLoaded = true;

  constructor(private matiereService: MatiereService) { }

  ngOnInit(): void {
    this.getMatieres();
  }

  getMatieres(){
    this.matiereService.getMatieres()
      .subscribe(data => {
        this.resourcesLoaded = false;
        this.matieres = data;        
      });
  }

}
