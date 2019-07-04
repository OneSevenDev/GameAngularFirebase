import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Lobby } from '../models/lobby';
import { Observable, Subscriber } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LobbyFirebaseService {

  private lobbyListSnapshot: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase,
  ) {
    this.lobbyListSnapshot = this.firebase.list<Lobby>('lobbies');
  }

  listLobbySnapshot(): Observable<any> {
    return this.lobbyListSnapshot.snapshotChanges();
  }

  lobbySnapshot(lobbyName: string): Observable<any> {
    return this.firebase.object('lobbies/' + lobbyName).valueChanges();
  }

  connectAvailableLobby(keyGamer: string): Observable<string> {
    return Observable.create((observer: Subscriber<string>) => {
      this.firebase.database.ref().child('lobbies').once('value', snapshot => {
        if (snapshot.numChildren() > 0) {
          let counterLobby = 0;
          snapshot.forEach(childSnapshot => {
            counterLobby++;
            const lobby: Lobby = childSnapshot.val();
            if (lobby.available) {
              this.newGamerInLobby(keyGamer, counterLobby).subscribe(response => {
                observer.next(response);
              });
            } else {
              if (snapshot.numChildren() === counterLobby) {
                this.newLobby(keyGamer, counterLobby).subscribe(response => {
                  observer.next(response);
                });
              }
            }
          });
        } else {
          this.newLobby(keyGamer, 0).subscribe(response => {
            observer.next(response);
          });
        }
      });
    });
  }

  newGamerInLobby(keyGamer: string, nLobby: number): Observable<string> {
    return Observable.create((observer: Subscriber<string>) => {
      this.firebase.database.ref(`lobbies/sala_${nLobby}`).once('value').then(snapshot => {
        const selectedLobby: Lobby = snapshot.val();

        selectedLobby.gamers.push(keyGamer);
        selectedLobby.available = selectedLobby.maxGamer > selectedLobby.gamers.length;

        this.firebase.database.ref(`lobbies/sala_${nLobby}`).update(selectedLobby)
          .then(response => {
            observer.next(`sala_${nLobby}`);
          })
          .catch(error => {
            observer.next('');
          });
      });
    });
  }

  newLobby(keyGamer: string, nLobby: number): Observable<string> {
    return Observable.create((observer: Subscriber<string>) => {
      const listGamers = [];
      listGamers.push(keyGamer);

      const lobbyData = {
        available: true,
        gamers: listGamers,
        maxGamer: environment.maxGamer,
      };

      const updates = {};
      updates[`lobbies/sala_${nLobby + 1}`] = lobbyData;

      this.firebase.database.ref().update(updates)
        .then(response => {
          observer.next(`sala_${nLobby + 1}`);
        })
        .catch(error => {
          observer.next('');
        });
    });
  }
}
