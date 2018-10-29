import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ToastController, ModalController } from 'ionic-angular';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

import { PermissionsPage } from '../permissions/permissions';
import { ItemDetailsPage } from '../item-details/item-details';

import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';
import { File } from '@ionic-native/File';
import { FileManager } from '../../providers/FileManager';
import { GlobalService } from '../../providers/GlobalService';
import { InAppBrowser } from '@ionic-native/in-app-browser';

const THUMBNAIL_WIDTH = 64;
const THUMBNAIL_HEIGHT = 48;

declare var PhotoSwipe;
declare var PhotoSwipeUI_Default;
declare var cordova;
declare var window;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';

  allFileList = [];
  entries = [];

  bsfFileList = [];

  library: LibraryItem[];
  albums:any = [];
  newurl: any;

  start = 0;

  constructor(public navCtrl: NavController,
      private photoLibrary: PhotoLibrary,
      private platform: Platform,
      private file: File,
      private global: GlobalService,
      private fileManager: FileManager,
      private cd: ChangeDetectorRef,
      private toastCtrl: ToastController,
      private browser: InAppBrowser,
      private modalCtrl: ModalController,
      ) {
console.log("323424232423432")
    //获取所有图片并展示缩略图
    // this.fetchAlbums();
    console.log('--------')
    // this.platform.ready()
    // .then(() => {
    //   console.log("平台加载完毕")
    //   // this.fileManager.browserLocal(cordova.file.externalRootDirectory)
    //   // .then(res => {
    //   //   // console.log(JSON.stringify(res))
    //   //   if(res.err_no === 0) {
    //   //     //列出文件成功
    //   //     this.allFileList = res.data;
    //   //   }
    //   // })
    //   // this.getAllPictures();
    //   // this.fileManager.scanLocalFiles(cordova.file.externalRootDirectory, 8, (data) => {
    //   //   console.log("音乐文件：" + data.musicFiles.length)
    //   //   console.log("文档文件: " + data.docFiles.length)
    //   //   console.log("视频文件：" + data.videoFiles.length)
    //   // })
    // })

    //搜索本地文件并分类
    // this.scanLocalFiles(cordova.file.externalRootDirectory);
    this.start = Date.now();
    // this.breadthFirstSearch([cordova.file.externalRootDirectory], 10);

    //本地文件浏览器
    // this.browserLocal(cordova.file.externalRootDirectory);

    //
  }

  // openBrowser() {
  //   console.log("----")
  //   const browser = this.browser.create('https://www.baidu.com/', "_blank", "location=yes&hardwareback=yes&hidespinner=yes&closebuttoncaption=close");
  //   browser.on('loadstop').subscribe(event => {
  //     console.log("加载完毕'");
  //     browser.show();
  //   });
  // }

  // //图片浏览
  // getAllPictures() {
  //    return this.fileManager.fetchAlbums()
  //     .then((res:any) => {
  //       console.log("========" + JSON.stringify(res))
  //       if(res && res.err_no === 0) {
  //         this.albums = this.global.localAlbums;
  //         this.library = this.global.localPictureLibrary;

  //         //测试代码: 文件缩略图保存
  //         this.fileManager.saveThumbnail(this.library[0], "abc.png");
  //       }
  //     }) 
  //     .catch(e => {
  //         console.log("错误....");
  //           console.log(e.stack);
  //     })   
  // }

  // goAlbumDetail(album) {
  //   this.navCtrl.push(ItemDetailsPage, {
  //     album: album
  //   })
  // }

  // itemTapped(event, libraryItem) {
  //   this.navCtrl.push(ItemDetailsPage, {
  //     libraryItem: libraryItem
  //   });
  // }

}
