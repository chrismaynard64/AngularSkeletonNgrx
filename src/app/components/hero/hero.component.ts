import { Component, OnInit, Input } from '@angular/core';
import { Hero } from 'src/app/store/hero/hero.model';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {


  @Input() heroes: Hero[] = [];
  
  constructor() { }

  ngOnInit() {
  }

}
