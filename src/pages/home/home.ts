import { Component } from '@angular/core';
import { Camera } from '@ionic-native/camera';
import { KairoServiceProvider } from '../../providers/kairo-service/kairo-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [KairoServiceProvider]
})
export class HomePage {
  public base64Image: string;
  name: string = null;
  constructor(private cam: Camera, public service: KairoServiceProvider) {
    
   }

  takePicture() {
    this.cam.getPicture({
      destinationType: this.cam.DestinationType.DATA_URL,
      targetWidth: 500,
      targetHeight: 500,
      cameraDirection:1,
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;

    }, (err) => {
      console.log(err);
    });
  }

  save() {
    if (this.name != null) {
      this.service.getUsers(this.base64Image,this.name).
        then(data => {
          console.log(data);
          
        })
    }
    console.log(this.name + "name" + this.base64Image);
  }
   verify() {
    if (this.name != null) {
      this.service.VerifyUsers(this.base64Image,this.name).
        then(data => {
          console.log(data);
        })
    }
    console.log(this.name + "name" + this.base64Image);
  }
  

}

