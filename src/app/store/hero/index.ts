import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromHeroState from './hero.reducer';
import { HeroState } from './hero.reducer';

export const getHeroState = createFeatureSelector<HeroState>('hero');

export const {
  selectIds: getAllHeroIds,
  selectEntities: getAllHeroEntitiesAsMap,
  selectAll: getAllHeroEntitiesAsArray,
  selectTotal: getTotalHeroEntities
} = fromHeroState.adapter.getSelectors(getHeroState);

export const getSelectedHeroId = createSelector(
  getHeroState,
  fromHeroState.getSelectedId
);

export const getSelectedHero = createSelector(
  getSelectedHeroId,
  getAllHeroEntitiesAsMap,
  (selectedHeroId, HeroEntities) =>
    selectedHeroId && HeroEntities[selectedHeroId]
);

export const getLoading = createSelector(
  getHeroState,
  fromHeroState.getLoading
);

export const getError = createSelector(
  getHeroState,
  fromHeroState.getError
);

export const getQuery = createSelector(
  getHeroState,
  fromHeroState.getQuery
);
