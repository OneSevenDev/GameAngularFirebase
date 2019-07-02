import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { LobbyFirebaseService } from 'src/app/services/lobby-firebase.service';
import { Lobby } from 'src/app/models/lobby';
import { GamerFirebaseService } from 'src/app/services/gamer-firebase.service';
import { Gamer } from 'src/app/models/gamer';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  refLobby: firebase.database.Reference;
  listGamer: Gamer[];

  constructor(
    private activateRouter: ActivatedRoute,
    private lobbyService: LobbyFirebaseService,
    private gamerService: GamerFirebaseService,
  ) {
  }

  ngOnInit() {
    this.loadLobby();
  }

  loadLobby(): void {
    this.activateRouter.params.subscribe(params => {
      const lobby = params['lobby'];
      const nick = params['nick'];
      if (lobby && nick) {
        this.lobbyService.lobbySnapshot(lobby).subscribe( (response: Lobby) => {
          this.listGamer = [];
          response.gamers.forEach( (element, index) => {
            this.gamerService.findGamerByKey(element).subscribe((gamer: Gamer) => {
              if (gamer) {
                gamer.score = 0;
                this.listGamer.push(gamer);
              }
            });
          });
        });
      }
    });
  }
}
