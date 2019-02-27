import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Hero } from './hero.model';
import { HeroActions, HeroActionTypes } from './hero.actions';

export interface HeroSearchQuery {
  filter: string;
  sorting: string;
  limit: number;
  page: number;
}

export interface HeroState extends EntityState<Hero> {
  // additional entities state properties
  selectedId: number;
  loading: boolean;
  error: string;
  query: HeroSearchQuery;
}

export const adapter: EntityAdapter<Hero> = createEntityAdapter<Hero>();

export const initialState: HeroState = adapter.getInitialState({
  // additional Hero state properties
  selectedId: null,
  loading: false,
  error: '',
  query: {
    filter: '',
    sorting: '',
    limit: 999,
    page: 1
  }
});

export function HeroReducer(state = initialState, action: HeroActions): HeroState {
  switch (action.type) {
    case HeroActionTypes.InsertHero:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case HeroActionTypes.InsertHeroSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };

    case HeroActionTypes.InsertHeroFail:
      return {
        ...state,
        loading: false,
        error: 'Hero insert failed: ' + action.payload.error
      };

    case HeroActionTypes.SearchAllHeroEntities:
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };

    case HeroActionTypes.SearchAllHeroEntitiesSuccess:
      return {
        ...adapter.addAll(action.payload.result, state),
        loading: false,
        error: ''
      };

    case HeroActionTypes.SearchAllHeroEntitiesFail:
      return {
        ...state,
        loading: false,
        error: 'Hero search failed: ' + action.payload.error
      };

    case HeroActionTypes.LoadHeroById:
      return {
        ...adapter.removeAll(state),
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case HeroActionTypes.LoadHeroByIdSuccess:
      return {
        ...adapter.addOne(action.payload.result, state),
        loading: false,
        error: ''
      };

    case HeroActionTypes.LoadHeroByIdFail:
      return {
        ...state,
        loading: false,
        error: 'Hero load failed: ' + action.payload.error
      };

    case HeroActionTypes.UpdateHero:
      return {
        ...state,
        loading: true,
        error: ''
      };

    case HeroActionTypes.UpdateHeroSuccess:
      return {
        ...adapter.updateOne(action.payload.update, state),
        loading: false,
        error: ''
      };

    case HeroActionTypes.UpdateHeroFail:
      return {
        ...state,
        loading: false,
        error: 'Hero update failed: ' + action.payload.error
      };

    case HeroActionTypes.DeleteHeroById:
      return {
        ...state,
        selectedId: action.payload.id,
        loading: true,
        error: ''
      };

    case HeroActionTypes.DeleteHeroByIdSuccess:
      return {
        ...adapter.removeOne(action.payload.id, state),
        loading: false,
        error: ''
      };

    case HeroActionTypes.DeleteHeroByIdFail:
      return {
        ...state,
        loading: false,
        error: 'Hero delete failed: ' + action.payload.error
      };

    case HeroActionTypes.SetSearchQuery:
      return {
        ...state,
        query: {
          ...state.query,
          ...action.payload
        }
      };

    case HeroActionTypes.SelectHeroById:
      return {
        ...state,
        selectedId: action.payload.id,
        error: ''
      };

    default:
      return state;
  }
}

export const getSelectedId = (state: HeroState) => state.selectedId;
export const getLoading = (state: HeroState) => state.loading;
export const getError = (state: HeroState) => state.error;
export const getQuery = (state: HeroState) => state.query;
