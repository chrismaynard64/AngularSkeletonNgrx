import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { SearchAllHeroEntities } from 'src/app/store/hero/hero.actions';
import { getAllHeroEntitiesAsArray } from 'src/app/store/hero';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  item$:any = null;
  items:any = null;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.item$ = this.store.select(getAllHeroEntitiesAsArray);
   
    this.item$.subscribe(items => {
      this.items = items;
    });  

    this.store.dispatch(new SearchAllHeroEntities());

  }

add() {

}

}
