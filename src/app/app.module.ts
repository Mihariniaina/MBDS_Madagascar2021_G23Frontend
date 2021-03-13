import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { Routes, RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';

import { AppComponent } from './app.component';
import { DevoirComponent } from './devoir/devoir.component';
import { EleveComponent } from './eleve/eleve.component';
import { MatiereComponent } from './matiere/matiere.component';

const routes:Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    // doit afficher le composant AssignmentsComponent (celui qui affiche la liste)
    path:"",
    component:DevoirComponent
  },
  {
    path:"eleves",
    component:EleveComponent
  },
  {
    path:"matieres",
    component:MatiereComponent
  },
  {
    path:"devoirs",
    component:DevoirComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    EleveComponent,
    MatiereComponent,
    DevoirComponent,
  ],
  imports: [
    BrowserModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    MatMenuModule, 
    MatTabsModule,
    RouterModule.forRoot(routes)
  ],
  // exports: [
  //   //MatTabsModule
  // ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
