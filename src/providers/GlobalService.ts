import { Injectable } from '@angular/core';

declare var cordova;

@Injectable()
export class GlobalService {
	static THUMBNAIL_WIDTH = 128; //缩略图宽 
	static THUMBNAIL_HEIGHT = 128; //缩略图高
	static THNUBNAIL_QUALITY = 0.8; //缩略质量
	localAlbums = []; //本地相册
	localPictureLibrary = []; //本地图片库
	localSearchedFiles = []; //本地搜索出来的文件，不包含图片
	fileSavePath = cordova.file.externalDataDirectory;

	constructor() {

	}
}