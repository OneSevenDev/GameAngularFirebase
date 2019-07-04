import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { SettingsService } from './app-settings.service';
import { Avatar } from '../models/avatar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvatarFirebaseService {

  avatarList: AngularFireList<any>;

  constructor(
    private firebase: AngularFireDatabase,
    ) {
    this.avatarList = this.firebase.list<Avatar>('avatars');
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
