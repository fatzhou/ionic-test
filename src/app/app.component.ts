import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { File } from '@ionic-native/File';

import { GlobalService } from '../providers/GlobalService'
import { FileManager } from '../providers/FileManager'

import { FileOpener } from '@ionic-native/file-opener';
declare var cordova;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  allFileList = [];

  constructor(platform: Platform, 
              private splashScreen: SplashScreen, 
              private file: File) {

    console.log("2342342342432xw")
    platform.ready().then(() => {
      console.log("平台加载完毕-33333---");
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();

    });
  }


}
