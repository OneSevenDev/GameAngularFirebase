import { Injectable } from '@angular/core';
import { Gamer } from '../models/gamer';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class GamerFirebaseService {

  private gamers: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase
    ) {
    this.initialGamers();
  }

  initialGamers() {
    this.gamers = this.firebase.list('avatars')
    return this.gamers;
  }

  insertar(model: Gamer) {
    this.gamers.push({
      nick: model.nick
    });
  }
}
