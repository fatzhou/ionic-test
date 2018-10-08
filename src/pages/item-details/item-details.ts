import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { File } from '@ionic-native/File';
import {DomSanitizer} from "@angular/platform-browser";
declare var cordova;
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {

  album: any = {};
  newurl: any;
  constructor(public navCtrl: NavController, 
  			private photoLibrary: PhotoLibrary,
  			private file: File,
        private navParams: NavParams,
        private sanitizer: DomSanitizer) {


  }

  ionViewDidLoad() {
  	this.album = this.navParams.get('album');
  }

  saveImage(photo) {
    console.log("保存图片:" + photo.thumbnailURL);
    let fullPath = decodeURIComponent(photo.thumbnailURL).split(';')[1];
    let filePath = "file://" + fullPath.replace(/\/[^\/]+$/,  "");
    let fileName = fullPath.replace(/^.+\/([^\/]+)\.(jpg|jpeg|png)[^\/]+$/, "$1.$2");
    console.log(filePath)
    console.log(fileName)
    // this.newurl = this.getBase64Image(this.sanitizer.bypassSecurityTrustResourceUrl(photo.thumbnailURL));
    // this.file.readAsBinaryString(filePath, fileName)
    // .then(res => {
    //   this.newurl = this.sanitizer.bypassSecurityTrustResourceUrl(photo.thumbnailURL);
    // 	console.log("读成功333")
    // 	console.log(res)
    // 	console.log(JSON.stringify(res))
    // 	console.log(res[0])
    // })
    // .catch(e => {
    // 	console.log("进了catch");
    // 	console.log(e)
    // })
  }

  getBase64Image(url) {
      var imgLink = url;
      var img = new Image();
      img.src = imgLink;
      img.crossOrigin = "*";
      img.onload = function(){
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var ext = img.src.substring(img.src.lastIndexOf(".")+1).toLowerCase();
        var dataURL = canvas.toDataURL("image/"+ext);
        console.log("dataURL  :" +dataURL);
        return dataURL;
      };
      
  }

  getURl(id){
    cordova.plugins.photoLibrary.getThumbnail(
      id, // or libraryItem.id,
      function(res){
        this.newurl = 'data:image/jpeg;base64,'+res.data;
        console.log("getUrl 的返回值"+ JSON.stringify(res));
      },
      function(res){
        this.newurl = 'data:image/jpeg;base64,'+res.data;

        console.log("getUrl 的返回值"+ JSON.stringify(res));
      },
      { // optional options
        thumbnailWidth: 512,
        thumbnailHeight: 384,
        quality: 0.8
      })
  }


}
