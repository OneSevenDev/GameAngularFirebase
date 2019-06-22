import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { FooterComponent } from './componets/shared/footer/footer.component';
import { SelectAvatarComponent } from './componets/select-avatar/select-avatar.component';
import { CoreFirebaseService } from './services/core-firebase.service';
import { SettingsService } from './services/app-settings.service';
import { GamerFirebaseService } from './services/gamer-firebase.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SelectAvatarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FormsModule,
  ],
  providers: [
    CoreFirebaseService,
    SettingsService,
    GamerFirebaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
