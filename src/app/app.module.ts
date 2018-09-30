import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PermissionsPage } from '../pages/permissions/permissions';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { File } from '@ionic-native/File';

import { CDVPhotoLibraryPipe } from './cdvphotolibrary.pipe';
import { PhotoLibrary } from '@ionic-native/photo-library';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PermissionsPage,
    ItemDetailsPage,
    CDVPhotoLibraryPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    PermissionsPage,
    ItemDetailsPage,
  ],
  providers: [
    PhotoLibrary,
    File,
    StatusBar, SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
