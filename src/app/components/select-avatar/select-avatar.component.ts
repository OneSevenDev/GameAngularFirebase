import { Component, OnInit } from '@angular/core';
import { CoreFirebaseService } from 'src/app/services/core-firebase.service';
import { Avatar } from 'src/app/models/avatar';
import { Gamer } from 'src/app/models/gamer';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { GamerFirebaseService } from 'src/app/services/gamer-firebase.service';

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
    private coreFirebase: CoreFirebaseService,
    private router: Router,
    private gamerService: GamerFirebaseService,
  ) { }

  ngOnInit() {
    this.loadAvatarts();
  }

  loadAvatarts(): void {
    this.coreFirebase.listAvatars().subscribe(response => {
      this.avataList = [];
      if (response.length === 0) {
        this.coreFirebase.InsertavatartDefault();
      } else {
        this.avataList = response.map(item => {
          return { $key: item.key, ...item.payload.val() };
        });
      }
    });
  }

  onSelectAvatar(avatar: Avatar) {
    this.avatarSelected = avatar;
    Swal.fire({
      title: 'Seleccione un avatar',
      text: `Esta seguro de escoger ${avatar.name} <i class="fa ${avatar.img}"></i>, una vez realizado no se puede cambiar`,
      type: 'question',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Juguemos!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>'
    }).then((result) => {
      if (result.value) {
        this.newGamer.avatar = this.avatarSelected.$key;
        this.newGamer.nick = result.value;

        this.gamerService.insertar(this.newGamer);

        this.avatarSelected.available = false;
        this.coreFirebase.update(this.avatarSelected);

        this.router.navigate(['/lobby', this.newGamer.nick]);
      }
    });
  }
}
