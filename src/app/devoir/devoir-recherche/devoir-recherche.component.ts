import { Input, OnDestroy } from '@angular/core';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Devoir } from 'src/app/model/devoir.model';
import { DevoirService } from 'src/app/shared/devoir.service';

@Component({
  selector: 'app-devoir-recherche',
  templateUrl: './devoir-recherche.component.html',
  styleUrls: ['./devoir-recherche.component.css', '../../../assets/css/material-dashboard.css?v=2.1.2']
})
export class DevoirRechercheComponent implements OnInit {
  texte = this.route.snapshot.params.texte;
  devoirs: Devoir[];
  resourcesLoaded = true;
  resultatTexte = "";
  affichageDevoir = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private devoirService: DevoirService
  ) { 
  }
  
  ngOnInit(): void {  
    console.log("init texte: "+this.texte);
    this.recherche();
  }

  recherche(){
    console.log("texte: "+this.texte);
    this.devoirService.recherche(this.texte)
    .subscribe(devoirs => {
      this.devoirs = devoirs;
      this.resultatTexte = this.devoirs.length+" devoir(s) trouvé(s) pour la recherche de '"+this.texte+"'";
      if(this.devoirs.length > 0){
        this.affichageDevoir = true;
      }
      this.resourcesLoaded = false;
    });
    this.router.navigate(['/recherche', this.texte]);
  }

}
