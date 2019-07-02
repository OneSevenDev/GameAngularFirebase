import { Injectable } from '@angular/core';

// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Avatar } from '../models/avatar';
import { Observable } from 'rxjs';
import { SettingsService } from './app-settings.service';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class CoreFirebaseService {

  // private avatarList: AngularFireList<any>;
  // selectAvatar: Avatar = new Avatar();
  avatarList: AngularFireList<Avatar>;

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
    const currentAvatar = this.firebase.object(model.$key);
    currentAvatar.set(model);
  }

  // delete(id: string) {
  //   this.avatarList.remove(id);
  // }
}
