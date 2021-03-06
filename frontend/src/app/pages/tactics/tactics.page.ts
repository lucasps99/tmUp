import { Component, OnInit } from '@angular/core';

import { PhotoService } from 'src/app/services/photo.service';
import { File } from '@ionic-native/file/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tactics',
  templateUrl: './tactics.page.html',
  styleUrls: ['./tactics.page.scss'],
})
export class TacticsPage implements OnInit {

  img;
  tactics: File;

  constructor(
    private router: Router,
    private photoService: PhotoService) { }

  ngOnInit() {

  }

  addImage(img){
    this.router.navigate(["/add-tactic", {img: img}]);
  }

  goToaddTactic(img){
    this.photoService.alertSheetPictureOptions();
  }
  
  seeImage(img){
  }

  openPdf(){

  }
  
  downloadPdf(){
    
  }

}
