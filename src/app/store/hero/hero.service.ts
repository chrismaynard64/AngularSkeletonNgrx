/*
 * TODO:
 * This file should not remain in the state folder. Move it to somewhere within
 * your app code.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hero } from './hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  BASE_URL = 'api/';

  constructor(private httpClient: HttpClient) {}

  create(Hero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(`${this.BASE_URL}Hero`, {
      ...Hero,
      // We clear out the ID to indicate that this should be a new entry:
      id: null
    });
  }

  search(): Observable<Array<Hero>> {
    // TODO: get based on state.paging (filter, sorting, page, limit)
    return this.httpClient.get<Array<Hero>>(`${this.BASE_URL}Hero`);
  }

  getById(id: number): Observable<Hero> {
    return this.httpClient.get<Hero>(`${this.BASE_URL}Hero/${id}`);
  }

  update(Hero: Hero): Observable<Hero> {
    return this.httpClient
      .put<Hero>(`${this.BASE_URL}Hero/${Hero.id}`, Hero)
      // The following pipe can be removed if your backend service returns the
      // edited value:
      .pipe(switchMap(() => of(Hero)));
  }

  deleteById(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.BASE_URL}Hero/${id}`)
      // The following pipe can be removed if your backend service returns the
      // ID or body of the deleted entity:
      .pipe(switchMap(() => of(id)));
  }
}
