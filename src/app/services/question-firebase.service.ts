import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionFirebaseService {

  questionList: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase,
  ) {
    this.questionList = this.firebase.list<Question>('questions');
  }

  listQuestions(): Observable<any> {
    return this.questionList.snapshotChanges();
  }

  insertar(model: Question) {
    this.questionList.push(model);
  }
}
