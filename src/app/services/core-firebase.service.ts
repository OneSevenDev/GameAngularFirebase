import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Avatar } from '../models/avatar';
import { SettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root'
})
export class CoreFirebaseService {

  private avatarList: AngularFireList<any>;
  selectAvatar: Avatar = new Avatar();

  constructor(
    private firebase: AngularFireDatabase,
    private settings: SettingsService
  ) {
  }

  InsertavatartDefault(): void{
    const lstAvatar: Avatar[] = this.settings.settingsAvatart();
    lstAvatar.forEach((element) => {
      const avatar: Avatar = new Avatar();
      avatar.img = element.img;
      avatar.available = true;
      this.insertar(avatar);
    });
  }

  getAvatars() {
    this.avatarList = this.firebase.list('avatars')
    return this.avatarList;
  }

  insertar(model: Avatar) {
    this.avatarList.push({
      img: model.img,
      available: model.available,
    });
  }

  update(model: Avatar) {
    this.avatarList.update(model.$key, {
      gamer: model.gamer
    });
  }

  delete(id: string) {
    this.avatarList.remove(id);
  }
}
