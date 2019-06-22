import { Injectable } from '@angular/core';
import * as avatars from '../settings/avatars.json';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
  ) {
  }

  public settingsAvatart(): any {
    return (avatars as any).default;
  }
}
