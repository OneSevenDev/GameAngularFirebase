import { Injectable } from '@angular/core';
// import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
// import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
// import { Lobby } from '../models/lobby';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LobbyFirebaseService {

  // items: Observable<any[]>;

  constructor(
    // private lobbyList: AngularFirestoreCollection<Lobby>,
    // private db: AngularFirestore
    ) {
      // this.lobbyList = this.db.collection<Lobby>('lobbys');
     }

  currentLobby(): void { // Observable<Lobby> {
    // console.log(this.lobbyList);
    // const lobby = this.lobbyList.doc<Lobby>('lobbys/1');
    // return lobby.valueChanges();
  }
}
