import { Injectable } from '@angular/core';
import { Avatar } from '../models/avatar';
import { Observable } from 'rxjs';
import { SettingsService } from './app-settings.service';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CoreFirebaseService {

  avatarList: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase,
    private settings: SettingsService
  ) {
    this.avatarList = firebase.list<Avatar>('avatars');
  }

  InsertavatartDefault(): void {
    const lstAvatar: Avatar[] = this.settings.settingsAvatart();
    lstAvatar.forEach((element) => {
      const avatar: Avatar = new Avatar();
      avatar.img = element.img;
      avatar.name = element.name;
      avatar.available = true;
      this.insertar(avatar);
    });
  }

  listAvatars(): Observable<any> {
    return this.avatarList.snapshotChanges();
  }

  insertar(model: Avatar) {
    this.avatarList.push(model);
  }

  update(model: Avatar) {
    this.avatarList.update(model.$key, { available: model.available });
  }

  delete(model: Avatar) {
    this.avatarList.remove(model.$key);
  }
}
