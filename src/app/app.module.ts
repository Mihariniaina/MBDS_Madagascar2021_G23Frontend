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
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {DatePipe} from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DevoirComponent } from './devoir/devoir.component';
import { EleveComponent } from './eleve/eleve.component';
import { MatiereComponent } from './matiere/matiere.component'
import { DevoirDetailsComponent } from './devoir/devoir-details/devoir-details.component';
import { ModifierComponent } from './message/modifier/modifier.component';
import { DevoirAjoutComponent } from './devoir/devoir-ajout/devoir-ajout.component';
import { AjoutComponent } from './message/ajout/ajout.component';
import { LoginComponent } from './login/login.component';
import { AideComponent } from './aide/aide.component';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { ChartsModule } from 'ng2-charts';

const routes:Routes = [
  {
    // indique que http://localhost:4200 sans rien ou avec un "/" à la fin
    path:"",
    component:LoginComponent
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
  },
  {
    path:"aide",
    component:AideComponent
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
    DevoirAjoutComponent,
    AjoutComponent,
    LoginComponent,
    AideComponent,
    BarChartComponent
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
    ReactiveFormsModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    ChartsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
