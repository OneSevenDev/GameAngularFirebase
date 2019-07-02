import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Lobby } from '../models/lobby';
import { Gamer } from '../models/gamer';

@Injectable({
  providedIn: 'root'
})
export class LobbyFirebaseService {

  lobbyList: AngularFireList<any>;

  firstLobby: Lobby = {
    $key: null,
    available: true,
    maxGamer: 2,
    gamers: null
  };

  constructor(
    private firebase: AngularFireDatabase,
    ) {
      this.lobbyList = firebase.list<Lobby>('lobbies');
     }

  connectAvailableLobby(newGamer: Gamer): void {
    this.lobbyList.snapshotChanges().subscribe(response => {
      if (response.length === 0) {
        this.newLobby(newGamer.$key);
      } else {
        response.forEach(element => {
          const genericList = element.payload.toJSON();
          genericList['$key'] = element.key;
          const lobby: Lobby = genericList as Lobby;

          if (lobby.gamers.length < lobby.maxGamer) {
            lobby.gamers.push(newGamer.$key);
            this.lobbyList.update(lobby.$key, { gamers: lobby.gamers });
          } else {
            this.newLobby(newGamer.$key);
          }
        });
      }
    });
  }

  newLobby(keyGamer: string): void {
    this.firstLobby.gamers.push(keyGamer);
    this.lobbyList.push(this.firstLobby);
  }
}
