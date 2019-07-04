import { Injectable } from '@angular/core';
import { Avatar } from '../models/avatar';
import { Observable } from 'rxjs';
import { SettingsService } from './app-settings.service';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';
import { AvatarFirebaseService } from './avatar-firebase.service';
import { Question } from '../models/question';
import { QuestionFirebaseService } from './question-firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CoreFirebaseService {

  avatarList: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase,
    private settings: SettingsService,
    private avatarService: AvatarFirebaseService,
    private questionService: QuestionFirebaseService,
  ) {
    this.avatarList = this.firebase.list<Avatar>('avatars');
  }

  SetConfigInitialApp(): void {
    this.InitialAvatarts();
    this.InitialQuestions();
  }

  InitialAvatarts(): void {
    const lstAvatar: Avatar[] = this.settings.settingsAvatars();

    lstAvatar.forEach((element) => {
      const avatar: Avatar = new Avatar();
      avatar.img = element.img;
      avatar.name = element.name;
      avatar.available = true;

      this.avatarService.insertar(avatar);
    });
  }

  InitialQuestions(): void {
    const lstQuestions: Question[] = this.settings.settingsQuestions();
    const newListQuestion = [];
    let counterQuestion = 0;
    const updates = {};

    lstQuestions.forEach((element) => {
      const question: Question = new Question();
      question.question = element.question;
      question.answerOk = element.answerOk;
      question.alternative = element.alternative;

      newListQuestion.push(question);
      updates[`questions/${counterQuestion}`] = question;

      counterQuestion++;
    });


    this.firebase.database.ref().update(updates);
  }
}
