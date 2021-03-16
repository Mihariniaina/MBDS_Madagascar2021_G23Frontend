import { Component, OnInit } from '@angular/core';
import { Devoir } from '../model/devoir.model';
import { DevoirService } from '../shared/devoir.service';

@Component({
  selector: 'app-devoir',
  templateUrl: './devoir.component.html',
  styleUrls: ['./devoir.component.css', '../../assets/css/material-dashboard.css?v=2.1.2']
})
export class DevoirComponent implements OnInit {
  devoirs: Devoir[];
  etat = "";
  
  constructor(private devoirService: DevoirService) { }

  ngOnInit(): void {
    this.etat = "rendus";
    this.getDevoirsRendus();
  }

  getDevoirsRendus(){
    this.etat = "rendus";
    this.devoirService.getDevoirsRendus()
      .subscribe(data => {
        this.devoirs = data;
      });
  }

  getDevoirsNonRendus(){
    this.etat = "non rendus";
    this.devoirService.getDevoirsNonRendus()
      .subscribe(data => {
        this.devoirs = data;
      });
  }
}
