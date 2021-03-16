import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Devoir } from 'src/app/model/devoir.model';
import { DevoirService } from 'src/app/shared/devoir.service';

@Component({
  selector: 'app-devoir-details',
  templateUrl: './devoir-details.component.html',
  styleUrls: ['./devoir-details.component.css', '../../../assets/css/material-dashboard.css?v=2.1.2']
})
export class DevoirDetailsComponent implements OnInit {
  devoir: Devoir;
  mention = "";

  constructor(private devoirService: DevoirService,
              private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.getDevoirById();
  }

  getDevoirById(){
    const id = this.route.snapshot.params.id;
    this.devoirService.getDevoirById(id)
      .subscribe(data => {
        this.devoir = data;
        this.mention = this.devoirService.mentionEleve(data.note);
      });
  }
}
