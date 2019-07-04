import { Injectable } from '@angular/core';
import * as avatars from '../settings/avatars.json';
import * as questions from '../settings/question_general_culture.json';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
  ) {
  }

  public settingsAvatars(): any {
    return (avatars as any).default;
  }

  public settingsQuestions(): any {
    return (questions as any).default;
  }
}
