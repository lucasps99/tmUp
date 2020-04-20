import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { apiRestProvider } from 'src/providers/apiRest/apiRest';

import { PhotoService } from 'src/app/services/photo.service';
import { Chooser } from '@ionic-native/chooser/ngx';
import { File } from '@ionic-native/file/ngx';

import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@Component({
  selector: 'app-tactics',
  templateUrl: './tactics.page.html',
  styleUrls: ['./tactics.page.scss'],
})
export class TacticsPage implements OnInit {

  img;

  constructor(
    private api: apiRestProvider,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private photoService: PhotoService,
    private photoViewer: PhotoViewer) { }

  ngOnInit() {
  }

  addImage(img){
    this.navCtrl.navigateForward(["add-tactic", {img: img}]);
    //this.photoService.cameraOptions();
  }

  goToaddTactic(img){
    //this.photo.alertSheetPictureOptions();
    //console.log('../assets/image/'+img+'.jpg')
    //this.navCtrl.navigateForward(["add-tactic", {img: img}]);
    this.photoService.cameraOptions();
  }
  
  seeImage(img){
    this.photoViewer.show('https://wallpaperplay.com/walls/full/3/b/4/268610.jpg');
  }


}
