import { HeroEditComponent } from './../../components/hero-edit/hero-edit.component';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store/reducers';
import { SearchAllHeroEntities, InsertHero, UpdateHero, DeleteHeroById } from 'src/app/store/hero/hero.actions';
import { getAllHeroEntitiesAsArray } from 'src/app/store/hero';
import { MatDialog } from '@angular/material';
import { Hero } from 'src/app/store/hero/hero.model';
import { HeroMessageService } from 'src/app/services/hero-message.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  item$:any = null;
  items:any = null;
  newName: string = '';
  heroSaveMessageSub = null
  heroDeleteMessageSub = null

  constructor(private store: Store<State>, public dialog: MatDialog,
    private heroMessageService: HeroMessageService) { }

  ngOnInit() {
    this.item$ = this.store.select(getAllHeroEntitiesAsArray);
   
    this.item$.subscribe(items => {
      this.items = items;
    });  

    this.store.dispatch(new SearchAllHeroEntities());

    this.heroSaveMessageSub = this.heroMessageService.getSaveHeroMessage().subscribe((hero: Hero) => {
      this.store.dispatch(new UpdateHero({ Hero: hero }));
    });

    this.heroDeleteMessageSub = this.heroMessageService.getDeleteHeroMessage().subscribe((hero: Hero) => {
      this.store.dispatch(new DeleteHeroById({ id: hero.id }));
    });

  }

  add() {
      if (this.newName.trim().length > 0) {
        this.store.dispatch(new InsertHero({Hero: {id: null, name: this.newName, description: ''}}));
      }
  }
  edit(hero: Hero) {
    const dialogRef = this.dialog.open(HeroEditComponent, {
      width: '250px',
      data: {...hero}
    });
  }
}
