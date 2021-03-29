import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon'; 
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import { Routes, RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { DevoirComponent } from './devoir/devoir.component';
import { EleveComponent } from './eleve/eleve.component';
import { MatiereComponent } from './matiere/matiere.component';
import { DevoirDetailsComponent } from './devoir/devoir-details/devoir-details.component';
import { ModifierComponent } from './message/modifier/modifier.component';
import { DevoirAjoutComponent } from './devoir/devoir-ajout/devoir-ajout.component';

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
  },
  {
    path:"devoir/:id",
    component:DevoirDetailsComponent
  },
  {
    path:"ajoutDevoir",
    component:DevoirAjoutComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    EleveComponent,
    MatiereComponent,
    DevoirComponent,
    DevoirDetailsComponent,
    ModifierComponent,
    DevoirAjoutComponent
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
    FormsModule,
    MatSnackBarModule, BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
