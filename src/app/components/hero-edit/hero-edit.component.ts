import { Component, OnInit, Input, Inject } from '@angular/core';
import { Hero } from 'src/app/store/hero/hero.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HeroMessageService } from 'src/app/services/hero-message.service';

@Component({
  selector: 'app-hero-edit',
  templateUrl: './hero-edit.component.html',
  styleUrls: ['./hero-edit.component.css']
})
export class HeroEditComponent implements OnInit {


  // @Input() hero: Hero = null;
   
  constructor(public dialogRef: MatDialogRef<HeroEditComponent>,
    @Inject(MAT_DIALOG_DATA) public hero: Hero,
    private heroMessageService: HeroMessageService) { }

  ngOnInit() {
  }


  cancel() {
      this.dialogRef.close();
  }

  save() {
    this.heroMessageService.saveHeroMessage(this.hero);
    this.dialogRef.close();
  }

  delete() {
    this.heroMessageService.deleteHeroMessage(this.hero);
    this.dialogRef.close();
  }
}
