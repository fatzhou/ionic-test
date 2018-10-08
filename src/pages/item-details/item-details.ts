import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { PhotoLibrary, LibraryItem } from '@ionic-native/photo-library';
import { File } from '@ionic-native/File';
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {

  album: any = {};

  constructor(public navCtrl: NavController, 
  			 private photoLibrary: PhotoLibrary,
  			 private file: File,
  			private navParams: NavParams) {


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
    this.file.readAsBinaryString(filePath, fileName)
    .then(res => {
    	console.log("读成功")
    	console.log(res)
    	console.log(JSON.stringify(res))
    	console.log(res[0])
    })
    .catch(e => {
    	console.log("进了catch");
    	console.log(e)
    })
  }
}
