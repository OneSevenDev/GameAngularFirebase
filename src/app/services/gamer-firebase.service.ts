import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Gamer } from '../models/gamer';
import Swal from 'sweetalert2';
import { LobbyFirebaseService } from 'src/app/services/lobby-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class GamerFirebaseService {

  private gamers: firebase.database.Reference;

  constructor(
    private firebase: AngularFireDatabase,
    private lobbyService: LobbyFirebaseService,
    ) {
      this.gamers = this.firebase.database.ref().child('gamers');
     }

  insertar(model: Gamer) {
    const keyGamer = this.gamers.push().key;
    this.firebase.database.ref('gamers/' + keyGamer).set({
      avatar: model.avatar,
      nick: model.nick,
    });

    this.lobbyService.connectAvailableLobby(keyGamer);

    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    }).fire({
      type: 'success',
      title: 'Bienvenido !'
    });
  }
}
