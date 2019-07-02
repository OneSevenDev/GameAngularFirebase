import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SelectAvatarComponent } from './components/select-avatar/select-avatar.component';
import { CoreFirebaseService } from './services/core-firebase.service';
import { SettingsService } from './services/app-settings.service';
import { GamerFirebaseService } from './services/gamer-firebase.service';
import { FormsModule } from '@angular/forms';
import { LobbyComponent } from './components/lobby/lobby.component';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

const routes: Routes = [
  { path: '', redirectTo: '/players', pathMatch: 'full' },
  { path: 'players', component: SelectAvatarComponent },
  { path: 'lobby/:lobby/:nick', component: LobbyComponent },
  // { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SelectAvatarComponent,
    LobbyComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    CoreFirebaseService,
    SettingsService,
    GamerFirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
