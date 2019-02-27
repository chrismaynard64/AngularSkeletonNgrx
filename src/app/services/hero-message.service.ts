import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Hero } from '../store/hero/hero.model';

@Injectable({
  providedIn: 'root'
})
export class HeroMessageService {

  private saveHeroSubject = new Subject<Hero>();
  private deleteHeroSubject = new Subject<Hero>();

  constructor() { }


  public getSaveHeroMessage(): Observable<Hero> {
    return this.saveHeroSubject.asObservable();
}

  public saveHeroMessage(hero: Hero) {
      this.saveHeroSubject.next(hero);
  }


  public getDeleteHeroMessage(): Observable<Hero> {
    return this.deleteHeroSubject.asObservable();
}

  public deleteHeroMessage(hero: Hero) {
      this.deleteHeroSubject.next(hero);
  }

}
