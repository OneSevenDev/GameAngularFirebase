import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable, Subscriber } from 'rxjs';
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
    return Observable.create((observer: Subscriber<Question[]>) => {
      this.firebase.database.ref(`questions`).once('value')
      .then(snapshot => {
        const list: Question[] = snapshot.val();
        if (list && list.length > 0) {
          observer.next(list);
        } else {
          observer.next(undefined);
        }
      })
      .catch( error => {
        console.log(error);
        observer.next(undefined);
      });
    });
  }
}
