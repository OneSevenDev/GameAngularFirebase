import { Component, OnInit } from '@angular/core';
import { CoreFirebaseService } from 'src/app/services/core-firebase.service';
import { Avatar } from 'src/app/models/avatar';

@Component({
  selector: 'app-select-avatar',
  templateUrl: './select-avatar.component.html',
  styleUrls: ['./select-avatar.component.css']
})
export class SelectAvatarComponent implements OnInit {

  avataList: Avatar[];

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
}
