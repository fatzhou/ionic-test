import { Component } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { ToastController, ModalController } from 'ionic-angular';
// import { Base64ToGallery } from '@ionic-native/base64-to-gallery';

// import { PermissionsPage } from '../permissions/permissions';
import { ItemDetailsPage } from '../item-details/item-details';

import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';
declare var cordova;

const THUMBNAIL_WIDTH = 256;
const THUMBNAIL_HEIGHT = 192;

// declare var PhotoSwipe;
// declare var PhotoSwipeUI_Default;
// declare var cordova;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  thumbnailWidth = THUMBNAIL_WIDTH + 'px';
  thumbnailHeight = THUMBNAIL_HEIGHT + 'px';

  library: LibraryItem[];
  albums:any = [];
  newurl: any;

  constructor(public navCtrl: NavController,
      private photoLibrary: PhotoLibrary,
      private platform: Platform,
      private cd: ChangeDetectorRef,
      private toastCtrl: ToastController,
      private modalCtrl: ModalController,
      ) {

    this.library = [];

    this.fetchAlbums();


  }

  goAlbumDetail(album) {
    this.navCtrl.push(ItemDetailsPage, {
      album: album
    })
  }

  fetchAlbums() {
    console.log("开始获取相册...")
    this.photoLibrary.getAlbums()
    .then(albums => {
        console.log("相册获取完毕........." + JSON.stringify(albums));
        this.albums = albums;
        albums.forEach(function(album:any) {
          // console.log(album.id);
          // console.log(album.title);
          album.photos = album.photos || [];
        });
        console.log("开始获取图片数据...");
        this.fetchPhotos();        
    })
    .catch(e => {
      console.log(e.stack);
      this.photoLibrary.requestAuthorization({read: true})
        .then(() => {
          this.fetchAlbums();
        })
    })
  }


  fetchPhotos() {

    this.platform.ready().then(() => {

      let library = [];

      this.photoLibrary.getLibrary({ thumbnailWidth: THUMBNAIL_WIDTH, thumbnailHeight: THUMBNAIL_HEIGHT, includeAlbumData: true/*, chunkTimeSec: 0.3*/ }).subscribe({
        next: (chunk) => {
          console.log("收到chunk数据:" + chunk.length)
          console.log(JSON.stringify(chunk))
          library = library.concat(chunk);

          // this.library.forEach(function(libraryItem) {
          //   // console.log(libraryItem.id);          // ID of the photo
          //   console.log(libraryItem.photoURL);    // Cross-platform access to photo
          //   console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
          //   // console.log(libraryItem.fileName);
          //   // console.log(libraryItem.width);
          //   // console.log(libraryItem.height);
          //   // console.log(libraryItem.creationDate);
          //   // console.log(libraryItem.latitude);
          //   // console.log(libraryItem.longitude);
          //   // console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          // });
          
          // this.library = library
          this.cd.detectChanges();
        },
        error: (err: string) => {
          console.log('*************')
          if (err.startsWith('Permission')) {
            this.photoLibrary.requestAuthorization({read: true})
              .then(() => {
                this.fetchPhotos();
              })
            // let permissionsModal = this.modalCtrl.create(PermissionsPage);
            // permissionsModal.onDidDismiss(() => {
            //   // retry
            //   this.fetchPhotos();
            // });
            // permissionsModal.present();

          } else { // Real error
            let toast = this.toastCtrl.create({
              message: `getLibrary error: ${err}`,
              duration: 6000,
            });
            toast.present();
          }
        },
        complete: () => {
              console.log('completed.........')
              this.library = library;


              this.getURl(this.library[1].id);
              this.albums.forEach(item => {
                item.photos = library.filter(x => {
                  return x.albumIds.indexOf(item.id) > -1;
                });
              })
              this.albums.forEach(item => {
                console.log("相册" + item.title + "的相片张数是" + item.photos.length);
              })
              // this.test(library[0].id);
              this.cd.detectChanges();
              // Library completely loaded
              // var pswpElement = document.querySelectorAll('.pswp')[0];
            }
        });
    });

  }

  itemTapped(event, libraryItem) {
    this.navCtrl.push(ItemDetailsPage, {
      libraryItem: libraryItem
    });
  }

  trackById(index: number, libraryItem: LibraryItem): string { return libraryItem.id; }
  getURl(id){
    var that = this;
    cordova.plugins.photoLibrary.getThumbnail(
      id, // or libraryItem.id,
      function(res){
        that.newurl = 'data:image/jpeg;base64,'+res.data;
        let database = that.newurl;
        // let fullpath = 
        cordova.plugins.photoLibrary.saveImageBase64(database,cordova.file.externalDataDirectory,'newbaseimg.png',function(){
          console.log("成功存储图片");
        });
        console.log("getUrl 的返回值"+ JSON.stringify(res));

        // console.log(" that newurl: " + that.newurl)
        // that.base64ToGallery.base64ToGallery(, { prefix: '_img' }).then(
        //   res => console.log('Saved image to gallery ', res),
        //   err => console.log('Error saving image to gallery ', err)
        // );
      },
      function(res){
        that.newurl = 'data:image/jpeg;base64,'+res.data;

        console.log("getUrl 的返回值"+ JSON.stringify(res));
        console.log("that  newurl: " + that.newurl)

      },
      { // optional options
        thumbnailWidth: 512,
        thumbnailHeight: 384,
        quality: 0.8
      })
  }
}
