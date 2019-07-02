import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Lobby } from '../models/lobby';

@Injectable({
  providedIn: 'root'
})
export class LobbyFirebaseService {

  refLobby: firebase.database.Reference;

  constructor(
    private firebase: AngularFireDatabase,
    ) {
      this.refLobby = this.firebase.database.ref().child('lobbies');
     }

  connectAvailableLobby(keyGamer: string): void {
    this.refLobby.once('value', snapshot => {
      if (snapshot.numChildren() > 0) {
        let counterLobby = 0;
        snapshot.forEach(childSnapshot => {
          counterLobby++;
          const lobby: Lobby = childSnapshot.val();
          if (lobby.available) {
            this.newGamerInLobby(keyGamer, counterLobby);
          } else {
            this.newLobby(keyGamer, counterLobby);
          }
        });
      } else {
        this.newLobby(keyGamer, 0);
      }
    });
  }

  newGamerInLobby(keyGamer: string, nLobby: number) {
    this.firebase.database.ref(`lobbies/sala_${nLobby}`).once('value').then(snapshot => {
      const selectedLobby: Lobby = snapshot.val();
      selectedLobby.gamers.push(keyGamer);
      selectedLobby.available = selectedLobby.maxGamer > selectedLobby.gamers.length;
      this.firebase.database.ref(`lobbies/sala_${nLobby}`).update(selectedLobby);
    });
  }

  newLobby(keyGamer: string, nLobby: number): void {
    const listGamers = [];
    listGamers.push(keyGamer);

    const lobbyData = {
      available: true,
      gamers: listGamers,
      maxGamer: 2,
    };

    const updates = {};
    updates[`lobbies/sala_${nLobby + 1}`] = lobbyData;

    this.firebase.database.ref().update(updates);
  }
}
