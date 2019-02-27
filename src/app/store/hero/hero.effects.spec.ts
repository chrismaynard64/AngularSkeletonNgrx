import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import {
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
  DeleteHeroByIdFail
} from './hero.actions';
import { generateHero, generateHeroArray } from './hero.model';
// TODO: Change this path when you move your service file:
import { HeroService } from './hero.service';
import { HeroEffects } from './hero.effects';

describe('HeroEffects', () => {
  let actions: Observable<any>;
  let effects: HeroEffects;
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeroEffects,
        provideMockActions(() => actions),
        {
          provide: HeroService,
          useValue: jasmine.createSpyObj('service', [
            'create',
            'search',
            'getById',
            'update',
            'deleteById'
          ])
        }
      ]
    });

    effects = TestBed.get(HeroEffects);
    service = TestBed.get(HeroService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('insert', () => {
    it('should return InsertHeroSuccess action with entity on success', () => {
      const entity = generateHero();
      const insertAction = new InsertHero({ Hero: entity });
      const successAction = new InsertHeroSuccess({ result: entity });

      actions = hot('a-', { a: insertAction });
      service.create.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.insert).toBeObservable(expected);
    });

    it('should return InsertHeroFail with error object on failure', () => {
      const entity = generateHero();
      const insertAction = new InsertHero({ Hero: entity });
      const failAction = new InsertHeroFail({ error: 'fail' });

      actions = hot('i-', { i: insertAction });
      service.create.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.insert).toBeObservable(expected);
    });
  });

  describe('search', () => {
    it('should return SearchAllHeroEntitiesSuccess action with entities on success', () => {
      const entities = generateHeroArray();
      const searchAction = new SearchAllHeroEntities();
      const successAction = new SearchAllHeroEntitiesSuccess({ result: entities });

      actions = hot('a-', { a: searchAction });
      service.search.and.returnValue(cold('-e|', { e: entities }));
      const expected = cold('-s', { s: successAction });

      expect(effects.search).toBeObservable(expected);
    });

    it('should return SearchAllHeroEntitiesFail with error object on failure', () => {
      const searchAction = new SearchAllHeroEntities();
      const failAction = new SearchAllHeroEntitiesFail({ error: 'fail' });

      actions = hot('a-', { a: searchAction });
      service.search.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.search).toBeObservable(expected);
    });
  });

  describe('loadById', () => {
    it('should return LoadHeroByIdSuccess action with entity on success', () => {
      const entity = generateHero();
      const loadAction = new LoadHeroById({ id: entity.id });
      const successAction = new LoadHeroByIdSuccess({ result: entity});

      actions = hot('a-', { a: loadAction });
      service.getById.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.loadById).toBeObservable(expected);
    });

    it('should return LoadHeroByIdFail with error object on failure', () => {
      const entity = generateHero();
      const loadAction = new LoadHeroById({ id: entity.id });
      const failAction = new LoadHeroByIdFail({ error: 'fail' });

      actions = hot('a-', { a: loadAction });
      service.getById.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.loadById).toBeObservable(expected);
    });
  });

  describe('update', () => {
    it('should return UpdateHeroSuccess action with entity on success', () => {
      const entity = generateHero();
      const updateAction = new UpdateHero({ Hero: entity });
      const successAction = new UpdateHeroSuccess({ update: {
        id: entity.id,
        changes: entity
      }});

      actions = hot('a-', { a: updateAction });
      service.update.and.returnValue(cold('-e|', { e: entity }));
      const expected = cold('-s', { s: successAction });

      expect(effects.update).toBeObservable(expected);
    });

    it('should return UpdateHeroFail with error object on failure', () => {
      const entity = generateHero();
      const updateAction = new UpdateHero({ Hero: entity });
      const failAction = new UpdateHeroFail({ error: 'fail' });

      actions = hot('a-', { a: updateAction });
      service.update.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.update).toBeObservable(expected);
    });
  });

  describe('delete', () => {
    it('should return DeleteHeroByIdSuccess action with entity ID on success', () => {
      const entity = generateHero();
      const deleteAction = new DeleteHeroById({ id: entity.id });
      const successAction = new DeleteHeroByIdSuccess({ id: entity.id });

      actions = hot('a-', { a: deleteAction });
      service.deleteById.and.returnValue(cold('-e|', { e: entity.id }));
      const expected = cold('-s', { s: successAction });

      expect(effects.delete).toBeObservable(expected);
    });

    it('should return DeleteHeroByIdFail with error object on failure', () => {
      const entity = generateHero();
      const deleteAction = new DeleteHeroById({ id: entity.id });
      const failAction = new DeleteHeroByIdFail({ error: 'fail' });

      actions = hot('a-', { a: deleteAction });
      service.deleteById.and.returnValue(cold('-#|', {}, { message: 'fail'}));
      const expected = cold('-f', { f: failAction });

      expect(effects.delete).toBeObservable(expected);
    });
  });

});
