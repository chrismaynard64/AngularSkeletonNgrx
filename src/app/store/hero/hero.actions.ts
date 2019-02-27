import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Hero } from './hero.model';
import { HeroSearchQuery } from './hero.reducer';

export enum HeroActionTypes {
  InsertHero = '[Hero] Insert',
  InsertHeroSuccess = '[Hero] Insert Success',
  InsertHeroFail = '[Hero] Insert Fail',

  SearchAllHeroEntities = '[Hero] Search',
  SearchAllHeroEntitiesSuccess = '[Hero] Search Success',
  SearchAllHeroEntitiesFail = '[Hero] Search Fail',

  LoadHeroById = '[Hero] Load By ID',
  LoadHeroByIdSuccess = '[Hero] Load Success',
  LoadHeroByIdFail = '[Hero] Load Fail',

  UpdateHero = '[Hero] Update',
  UpdateHeroSuccess = '[Hero] Update Success',
  UpdateHeroFail = '[Hero] Update Fail',

  DeleteHeroById = '[Hero] Delete By ID',
  DeleteHeroByIdSuccess = '[Hero] Delete Success',
  DeleteHeroByIdFail = '[Hero] Delete Fail',

  SetSearchQuery = '[Hero] Set Search Query',
  SelectHeroById = '[Hero] Select By ID'
}

// ========================================= INSERT

export class InsertHero implements Action {
  readonly type = HeroActionTypes.InsertHero;
  constructor(public payload: { Hero: Hero }) {}
}

export class InsertHeroSuccess implements Action {
  readonly type = HeroActionTypes.InsertHeroSuccess;
  constructor(public payload: { result: Hero }) {}
}

export class InsertHeroFail implements Action {
  readonly type = HeroActionTypes.InsertHeroFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= SEARCH

export class SearchAllHeroEntities implements Action {
  readonly type = HeroActionTypes.SearchAllHeroEntities;
}

export class SearchAllHeroEntitiesSuccess implements Action {
  readonly type = HeroActionTypes.SearchAllHeroEntitiesSuccess;
  constructor(public payload: { result: Array<Hero> }) {}
}

export class SearchAllHeroEntitiesFail implements Action {
  readonly type = HeroActionTypes.SearchAllHeroEntitiesFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= LOAD BY ID

export class LoadHeroById implements Action {
  readonly type = HeroActionTypes.LoadHeroById;
  constructor(public payload: { id: number }) {}
}

export class LoadHeroByIdSuccess implements Action {
  readonly type = HeroActionTypes.LoadHeroByIdSuccess;
  constructor(public payload: { result: Hero }) {}
}

export class LoadHeroByIdFail implements Action {
  readonly type = HeroActionTypes.LoadHeroByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= UPDATE

export class UpdateHero implements Action {
  readonly type = HeroActionTypes.UpdateHero;
  constructor(public payload: { Hero: Hero }) {}
}

export class UpdateHeroSuccess implements Action {
  readonly type = HeroActionTypes.UpdateHeroSuccess;
  constructor(public payload: { update: Update<Hero> }) {}
}

export class UpdateHeroFail implements Action {
  readonly type = HeroActionTypes.UpdateHeroFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= DELETE

export class DeleteHeroById implements Action {
  readonly type = HeroActionTypes.DeleteHeroById;
  constructor(public payload: { id: number }) {}
}

export class DeleteHeroByIdSuccess implements Action {
  readonly type = HeroActionTypes.DeleteHeroByIdSuccess;
  constructor(public payload: { id: number }) {}
}

export class DeleteHeroByIdFail implements Action {
  readonly type = HeroActionTypes.DeleteHeroByIdFail;
  constructor(public payload: { error: string }) {}
}

// ========================================= QUERY

export class SetSearchQuery implements Action {
  readonly type = HeroActionTypes.SetSearchQuery;
  constructor(public payload: Partial<HeroSearchQuery>) {}
}

// ========================================= SELECTED ID

export class SelectHeroById implements Action {
  readonly type = HeroActionTypes.SelectHeroById;
  constructor(public payload: { id: number }) {}
}

export type HeroActions =
  | InsertHero
  | InsertHeroSuccess
  | InsertHeroFail
  | SearchAllHeroEntities
  | SearchAllHeroEntitiesSuccess
  | SearchAllHeroEntitiesFail
  | LoadHeroById
  | LoadHeroByIdSuccess
  | LoadHeroByIdFail
  | UpdateHero
  | UpdateHeroSuccess
  | UpdateHeroFail
  | DeleteHeroById
  | DeleteHeroByIdSuccess
  | DeleteHeroByIdFail
  | SetSearchQuery
  | SelectHeroById;
