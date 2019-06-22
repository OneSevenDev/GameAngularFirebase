import { Component, OnInit } from '@angular/core';
import { CoreFirebaseService } from 'src/app/services/core-firebase.service';
import { Avatar } from 'src/app/models/avatar';
import { Gamer } from 'src/app/models/gamer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.css']
})
export class SelectAvatarComponent implements OnInit {

  avatarSelected: Avatar;
  avataList: Avatar[];
  newGamer: Gamer = new Gamer();

  constructor(
    private coreFirebase: CoreFirebaseService
  ) { }

  ngOnInit() {
    this.loadAvatarts();
  }

  loadAvatarts(): void {
    this.coreFirebase.getAvatars()
      .snapshotChanges().subscribe(item => {
        this.avataList = [];
        if (item.length === 0) {
          this.coreFirebase.InsertavatartDefault();
        } else {
          item.forEach(element => {
            const genericList = element.payload.toJSON();
            genericList['$key'] = element.key;
            this.avataList.push(genericList as Avatar);
          });
        }
      });
  }

  onSelectAvatar(avatar: Avatar) {
    this.avatarSelected = avatar;
    console.log(avatar);
  }

  onSubmit(gamerForm: NgForm) {
    console.log(gamerForm.value);
  }
}
