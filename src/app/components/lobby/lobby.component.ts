import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { LobbyFirebaseService } from 'src/app/services/lobby-firebase.service';
import { Lobby } from 'src/app/models/lobby';
import { GamerFirebaseService } from 'src/app/services/gamer-firebase.service';
import { Gamer } from 'src/app/models/gamer';
import { QuestionFirebaseService } from 'src/app/services/question-firebase.service';
import { Question } from 'src/app/models/question';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  refLobby: firebase.database.Reference;
  listGamer: Gamer[];
  listQuestions: Question[];
  currentGamer: Gamer = new Gamer();
  currentQuestion: Question = new Question();
  timerStart: any;
  timerInterbalQuestion: any;
  timerClock: any;
  startGame: boolean;
  showLoader: boolean;
  timerDowngrade: string;
  viewBrowserGamer: string;
  selectQuestion: number;

  constructor(
    private activateRouter: ActivatedRoute,
    private lobbyService: LobbyFirebaseService,
    private gamerService: GamerFirebaseService,
    private questionService: QuestionFirebaseService,
  ) {
  }

  ngOnInit() {
    this.startGame = false;
    this.timerDowngrade = '00:00';
    this.loadLobby();
  }

  loadLobby(): void {
    this.activateRouter.params.subscribe(params => {
      const lobby = params['lobby'];
      const nick = this.viewBrowserGamer = params['nick'];
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
                    this.loadQuestion();
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
    this.showLoader = true;
    this.timerStart = setInterval(() => {
      timerSecond++;
      console.log(timerSecond);
      if (timerSecond === 3) {
        if (this.listQuestions.length > 0) {
          this.runQuestionTimer();
          this.startAndResetTimer();
          this.startGame = true;
        }
        console.log('Go !');
        this.showLoader = false;
        clearInterval(this.timerStart);
      }
    }, 1000);
  }

  loadQuestion() {
    Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    }).fire({
      type: 'info',
      title: 'Obteniendo datos...'
    });

    this.listQuestions = [];
    this.questionService.listQuestions().subscribe(response => {
      if (response) {
        this.listQuestions = response;
      } else {
        clearInterval(this.timerStart);

        Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        }).fire({
          type: 'error',
          title: 'No se pudo obtener las preguntas'
        });
      }
    });
  }

  runQuestionTimer(nextQuestion: number) {
    if (this.timerInterbalQuestion !== undefined) {
      clearInterval(this.timerInterbalQuestion);
    }

    this.selectQuestion = nextQuestion === undefined ? 0 : nextQuestion;
    this.currentQuestion = this.listQuestions[this.selectQuestion];

    this.timerInterbalQuestion = setInterval(() => {
      console.log('ejecucion Nro: ' + this.selectQuestion);
      this.selectQuestion++;
      if (this.listQuestions.length <= this.selectQuestion) {
        console.log('Fin del juego !');
        clearInterval(this.timerInterbalQuestion);
        clearInterval(this.timerClock);
        this.timerDowngrade = '00:00';
      }

      if (this.listQuestions[this.selectQuestion] !== undefined) {
        this.currentQuestion = this.listQuestions[this.selectQuestion];
        console.log(this.currentQuestion);
      }
    }, environment.timerResponse * 1000);
  }

  sendResponse() {
    if (this.listQuestions.length > this.selectQuestion + 1) {
      this.startAndResetTimer();
      this.runQuestionTimer(this.selectQuestion + 1);
      // suma puntaje
    }
  }

  startAndResetTimer() {
    if (this.timerClock !== undefined) {
      clearInterval(this.timerClock);
    }
    let initTimer = environment.timerResponse;
    this.timerDowngrade = '00:10';
    this.timerClock = setInterval(() => {
      initTimer--;
      this.timerDowngrade = '00:0' + initTimer;
      if (initTimer === 0) {
        clearInterval(this.timerClock);
        this.startAndResetTimer();
      }
    }, 1000);
  }
}
