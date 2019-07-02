import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Gamer } from '../models/gamer';

@Injectable({
  providedIn: 'root'
})
export class GamerFirebaseService {

  private gamers: AngularFireList<Gamer>;

  constructor(
    private firebase: AngularFireDatabase,
    ) {
      this.gamers = firebase.list<Gamer>('gamers');
  }

  insertar(model: Gamer) {
    this.gamers.push(model);
  }
}
