import {
  Hero,
  generateHero,
  generateHeroMap,
  generateHeroArray
} from './hero.model';
import * as actions from './hero.actions';
import {
  HeroReducer,
  initialState,
  getSelectedId,
  getLoading,
  getError,
  getQuery
} from './hero.reducer';
import { Update } from '@ngrx/entity';

const INITIAL_STATE_WITH_ERROR = {
  ...initialState,
  error: 'some error'
};
const BLANK_ERROR_MESSAGE = '';

describe('HeroReducer', () => {
  describe('upon an undefined action', () => {
    it('should return the default state upon an undefined action', () => {
      const action = { type: 'NOT DEFINED' } as any;

      expect(HeroReducer(initialState, action)).toEqual(initialState);
    });
  });

  describe('upon InsertHero', () => {
    it('should set loading to true and clear any error', () => {
      const action = new actions.InsertHero({ Hero: generateHero() });

      expect(HeroReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon InsertHeroSuccess', () => {
    it('should add the given Hero, set loading to false, and clear any error', () => {
      const result = generateHero();
      const action = new actions.InsertHeroSuccess({ result });

      expect(HeroReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        ...generateHeroMap([result]),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon InsertHeroFail', () => {
    it('should set loading to true and echo the error', () => {
      const error = 'test insert error';
      const action = new actions.InsertHeroFail({ error });

      expect(HeroReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Hero insert failed: ${error}`
      });
    });
  });

  describe('upon SearchAllHeroEntities', () => {
    it('should remove Hero entities, set loading to true, and clear any error', () => {
      const initialStateWithHeroEntities = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generateHeroMap()
      };
      const action = new actions.SearchAllHeroEntities();

      expect(HeroReducer(initialStateWithHeroEntities, action)).toEqual({
        ...initialState,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon SearchAllHeroEntitiesSuccess', () => {
    it('should add Hero entities, set loading to false, and clear any error', () => {
      const result = generateHeroArray();
      const action = new actions.SearchAllHeroEntitiesSuccess({ result });

      expect(HeroReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        ...generateHeroMap(result),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon SearchAllHeroEntitiesFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test search error';
      const action = new actions.SearchAllHeroEntitiesFail({ error });

      expect(HeroReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Hero search failed: ${error}`
      });
    });
  });

  describe('upon LoadHeroById', () => {
    it('should remove Hero entities, set selected id, and clear any error', () => {
      const id = 8675309;
      const initialStateWithHeroEntities = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generateHeroMap()
      };
      const action = new actions.LoadHeroById({ id });

      expect(HeroReducer(initialStateWithHeroEntities, action)).toEqual({
        ...initialState,
        selectedId: id,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon LoadHeroByIdSuccess', () => {
    it('should add the given Hero, set loading to false, and clear any error', () => {
      const result = generateHero();
      const action = new actions.LoadHeroByIdSuccess({ result });

      expect(HeroReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        ...generateHeroMap([result]),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon LoadHeroByIdFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test load by id error';
      const action = new actions.LoadHeroByIdFail({ error });

      expect(HeroReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Hero load failed: ${error}`
      });
    });
  });

  describe('upon UpdateHero', () => {
    it('should set loading to true and clear any errior', () => {
      const Hero = generateHero();
      const action = new actions.UpdateHero({ Hero });

      expect(HeroReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon UpdateHeroSuccess', () => {
    it('should add the given Hero, set loading to false, and clear any error', () => {
      const Hero = generateHero();
      const initialStateWithHero = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generateHeroMap([Hero])
      };
      const updatedHero = {
        ...Hero,
        name: Hero.name + ' EDITED',
        description: Hero.description + ' EDITED'
      };
      const update = {
        id: updatedHero.id,
        changes: updatedHero
      } as Update<Hero>;
      const action = new actions.UpdateHeroSuccess({ update });

      expect(HeroReducer(initialStateWithHero, action)).toEqual({
        ...initialStateWithHero,
        ...generateHeroMap([updatedHero]),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon UpdateHeroFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test update error';
      const action = new actions.UpdateHeroFail({ error });

      expect(HeroReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Hero update failed: ${error}`
      });
    });
  });

  describe('upon DeleteHeroById', () => {
    it('should set the id, set loading to true, and clear any error', () => {
      const id = 4815162342;
      const action = new actions.DeleteHeroById({ id });

      expect(HeroReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        selectedId: id,
        loading: true,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon DeleteHeroByIdSuccess', () => {
    it('should remove the id-given Hero, set loading to false, and clear any error', () => {
      const id = 18009453669;
      const HeroToBeRemoved = generateHero(id);
      const expectedHeroEntities = generateHeroArray();
      const HeroEntitiesWithHeroToBeRemoved = [
        ...expectedHeroEntities,
        HeroToBeRemoved
      ];
      const initialStateWithAllHeroEntities = {
        ...INITIAL_STATE_WITH_ERROR,
        ...generateHeroMap(HeroEntitiesWithHeroToBeRemoved)
      };
      const action = new actions.DeleteHeroByIdSuccess({ id });

      expect(
        HeroReducer(initialStateWithAllHeroEntities, action)
      ).toEqual({
        ...initialStateWithAllHeroEntities,
        ...generateHeroMap(expectedHeroEntities),
        loading: false,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });

  describe('upon DeleteHeroByIdFail', () => {
    it('should set loading to false and echo the error', () => {
      const error = 'test delete error';
      const action = new actions.DeleteHeroByIdFail({ error });

      expect(HeroReducer(initialState, action)).toEqual({
        ...initialState,
        loading: false,
        error: `Hero delete failed: ${error}`
      });
    });
  });

  describe('upon SetSearchQuery', () => {
    it('should set the query', () => {
      const query = {
        filter: 'someFilter',
        sorting: 'someSort',
        limit: 1000000000000,
        page: 888888
      };
      const action = new actions.SetSearchQuery(query);

      expect(HeroReducer(initialState, action)).toEqual({
        ...initialState,
        query
      });
    });
  });

  describe('upon SelectHeroById', () => {
    it('should set the id and clear any error', () => {
      const id = 73;
      const action = new actions.SelectHeroById({ id });

      expect(HeroReducer(INITIAL_STATE_WITH_ERROR, action)).toEqual({
        ...initialState,
        selectedId: id,
        error: BLANK_ERROR_MESSAGE
      });
    });
  });
});

describe('getters', () => {
  describe('getSelectedId', () => {
    it('should return the selected id', () => {
      expect(getSelectedId(initialState)).toEqual(initialState.selectedId);
    });
  });
  describe('getLoading', () => {
    it('should return the selected id', () => {
      expect(getLoading(initialState)).toEqual(initialState.loading);
    });
  });
  describe('getError', () => {
    it('should return the selected id', () => {
      expect(getError(INITIAL_STATE_WITH_ERROR))
        .toEqual(INITIAL_STATE_WITH_ERROR.error);
    });
  });
  describe('getQuery', () => {
    it('should return the selected id', () => {
      expect(getQuery(initialState))
        .toEqual(initialState.query);
    });
  });
});
