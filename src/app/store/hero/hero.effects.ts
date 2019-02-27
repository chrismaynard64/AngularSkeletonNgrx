import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import {
  exhaustMap,
  map,
  catchError,
  tap,
  switchMap
} from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import {
  HeroActionTypes,
  InsertHero,
  InsertHeroSuccess,
  InsertHeroFail,
  SearchAllHeroEntities,
  SearchAllHeroEntitiesSuccess,
  SearchAllHeroEntitiesFail,
  LoadHeroById,
  LoadHeroByIdSuccess,
  LoadHeroByIdFail,
  UpdateHero,
  UpdateHeroSuccess,
  UpdateHeroFail,
  DeleteHeroById,
  DeleteHeroByIdSuccess,
  DeleteHeroByIdFail,
  SetSearchQuery,
  SelectHeroById
} from './hero.actions';
import { Hero } from './hero.model';
import { HeroService } from './hero.service';

@Injectable()
export class HeroEffects {

  // ========================================= INSERT
  @Effect()
  insert: Observable<Action> = this.actions$
    .pipe(
      ofType<InsertHero>(HeroActionTypes.InsertHero),
      exhaustMap((action) =>
        this.service.create(action.payload.Hero).pipe(
          map((Hero: Hero) => new InsertHeroSuccess({ result: Hero })),
          catchError(({ message }) =>
            of(new InsertHeroFail({ error: message }))
          )
        )
      )
    );

  // ========================================= SEARCH
  @Effect()
  search: Observable<Action> = this.actions$
  .pipe(
      ofType<SearchAllHeroEntities>(HeroActionTypes.SearchAllHeroEntities),
      // Use the state's filtering and pagination values in this search call
      // here if desired:
      exhaustMap(() =>
        this.service.search().pipe(
          map((entities: Array<Hero>) =>
            new SearchAllHeroEntitiesSuccess({ result: entities })
          ),
          catchError(({ message }) =>
            of(new SearchAllHeroEntitiesFail({ error: message }))
          )
        )
      )
    );

  // ========================================= LOAD BY ID
  @Effect()
  loadById: Observable<Action> = this.actions$
  .pipe(
      ofType<LoadHeroById>(HeroActionTypes.LoadHeroById),
      switchMap((action) =>
        this.service.getById(action.payload.id).pipe(
          map((Hero: Hero) => new LoadHeroByIdSuccess({ result: Hero })
          ),
          catchError(({ message }) =>
            of(new LoadHeroByIdFail({ error: message }))
          )
        )
      )
    );

  // ========================================= UPDATE
  @Effect()
  update: Observable<Action> = this.actions$
  .pipe(
      ofType<UpdateHero>(HeroActionTypes.UpdateHero),
      exhaustMap((action) =>
        this.service.update(action.payload.Hero).pipe(
          map((Hero: Hero) =>
            new UpdateHeroSuccess({
              update: {
                id: Hero.id,
                changes: Hero
              } as Update<Hero>
            })
          ),
          catchError(({ message }) =>
            of(new UpdateHeroFail({ error: message }))
          )
        )
      )
    );

  // ========================================= DELETE
  @Effect()
  delete: Observable<Action> = this.actions$
  .pipe(
      ofType<DeleteHeroById>(HeroActionTypes.DeleteHeroById),
      exhaustMap((action) =>
        this.service.deleteById(action.payload.id).pipe(
          map((id: number) => new DeleteHeroByIdSuccess({ id })),
          catchError(({ message }) =>
            of(new DeleteHeroByIdFail({ error: message }))
          )
        )
      )
    );

  // ========================================= QUERY
  @Effect({
    dispatch: false
  })
  paging: Observable<Action> = this.actions$
  .pipe(
      ofType<SetSearchQuery>(HeroActionTypes.SetSearchQuery),
      tap((action) => {
        // do stuff with: action.payload.limit & action.payload.page
      })
    );

  // ========================================= SELECTED ID
  @Effect({
    dispatch: false
  })
  selectedId: Observable<Action> = this.actions$
  .pipe(
      ofType<SelectHeroById>(HeroActionTypes.SelectHeroById),
      tap((action) => {
        // do stuff with: action.payload.id
      })
    );

  constructor(private actions$: Actions, private service: HeroService) {}
}
