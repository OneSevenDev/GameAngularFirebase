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
  currentGamer: Gamer = new Gamer();
  timerStart: NodeJS.Timer = undefined;
  startGame: boolean;

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
          if (response) {
            let counterGamersConnected = 0;
            response.gamers.forEach( (element, index) => {
              this.gamerService.findGamerByKey(element).subscribe((gamer: Gamer) => {
                if (gamer) {
                  counterGamersConnected++;
                  gamer.score = 0;
                  this.listGamer.push(gamer);

                  if (gamer.nick === nick) {
                    this.currentGamer = gamer;
                  }

                  if (counterGamersConnected === response.maxGamer) {
                    this.loadingGame();
                  }
                }
              });
            });
          }
        });
      }
    });
  }

  loadingGame() {
    console.log('El juego inica en: ');
    let timerSecond = 0;
    this.startGame = true;
    this.timerStart = setInterval(() => {
      timerSecond++;
      console.log(timerSecond);
      if (timerSecond === 3) {
        console.log('Go !');
        this.startGame = false;
        clearInterval(this.timerStart);
      }
    }, 1000);
  }
}
