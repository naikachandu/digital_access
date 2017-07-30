
import { Component } from '@angular/core';
import { ToastController, ActionSheetController, LoadingController } from 'ionic-angular';

import { TextToSpeech } from '@ionic-native/text-to-speech';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions } from '@ionic-native/camera-preview';

import { KairoServiceProvider } from '../../providers/kairo-service/kairo-service';
import { Transaction } from '../../app/data/transaction';
import { Image } from '../../app/data/image';
import { Attributes } from '../../app/data/image';
import { Gender } from '../../app/data/image';
import { Enroll } from '../../app/data/enroll';
const cameraPreviewOpts: CameraPreviewOptions = {
  x: 0,
  y: 0,
  width: window.screen.width,
  height: window.screen.height,
  camera: 'front',
  tapPhoto: true,
  previewDrag: false,
  toBack: true,
  alpha: 1
};
const pictureOpts: CameraPreviewPictureOptions = {
  width: window.screen.width,
  height: window.screen.height,
  quality: 85
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [KairoServiceProvider]
})

export class HomePage {
  public base64Image: string = null;
  mob_cam: boolean;
  name: string = null;
  recognise: string;
  enroll: Enroll;
  nameField: boolean = false;
  verifybtn: boolean = false;
  loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });

  constructor(public actionSheetCtrl: ActionSheetController, private service: KairoServiceProvider, private toastCtrl: ToastController, private tts: TextToSpeech, private cameraPreview: CameraPreview, public loadingCtrl: LoadingController) {

    this.enableCamera();
    this.presentActionSheet();


  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Enroll',
          role: 'destructive',
          handler: () => {
            this.saveImg();
          }
        },
        {
          text: 'Verify',
          handler: () => {
            this.verifyUser();
          }
        }
      ]
    });

    actionSheet.present();
  }

  // Camera Functions Starts

  enableCamera() {
    this.mob_cam = true;
    this.cameraPreview.startCamera(cameraPreviewOpts).then(
      (res) => {
        console.log(res + 'hi')
      },
      (err) => {
        console.log(err)
      });

  }
  stopCamera() {
    this.mob_cam = false;
    this.cameraPreview.stopCamera();
  }

  takePicture() {
    if (this.mob_cam) {
      this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        this.stopCamera();
      }, (err) => {
        console.log(err);
        this.base64Image = 'assets/img/test.jpg';
      });
    }
  }

  // Camera Functions Ends


  saveImg() {
    this.nameField = true;
  }

  verifyUser() {
    this.verifybtn = true;
  }
  save() {
    if (this.name == null && this.base64Image == null) {
      this.presentToast('Please Enter Name and click your picture to Save ! ');
      this.tts.speak('Please Enter Name and click your picture to Save ! ')
    }
    else
      if (this.name == null) {
        this.presentToast('Please Enter Name');
        this.tts.speak('Please Enter Name');
      }
      else
        if (this.base64Image == null) {
          this.presentToast('Please click your picture to Save !');
          this.tts.speak('Please click your picture to Save !')
        }
        else {
          this.loading.present();
          this.service.getUsers(this.base64Image, this.name).
            then(data => {
              console.log(data);
              if (data.face_id) {
                this.enroll = <Enroll>data;
                let faceId: string = this.enroll.face_id;
                let images: Image[] = new Array(this.enroll.images.length);
                console.log(this.enroll.images + "images")
                let gender: Gender;
                let i = 0;
                for (i = 0; i < this.enroll.images.length; i++) {
                  let transaction = new Transaction(this.enroll.images[i].transaction.status, this.enroll.images[i].transaction.topLeftX, this.enroll.images[i].transaction.topLeftY, this.enroll.images[i].transaction.gallery_name, this.enroll.images[i].transaction.timestamp, this.enroll.images[i].transaction.height, this.enroll.images[i].transaction.quality, this.enroll.images[i].transaction.confidence, this.enroll.images[i].transaction.subject_id, this.enroll.images[i].transaction.width, this.enroll.images[i].transaction.face_id);
                  gender = new Gender(this.enroll.images[i].attributes.gender.type);
                  let attributes = new Attributes(this.enroll.images[i].attributes.lips, this.enroll.images[i].attributes.asian, this.enroll.images[i].attributes.gender, this.enroll.images[i].attributes.age, this.enroll.images[i].attributes.hispanic, this.enroll.images[i].attributes.other, this.enroll.images[i].attributes.black, this.enroll.images[i].attributes.white, this.enroll.images[i].attributes.glasses)

                  let im: Image = new Image(attributes, transaction);
                  images.push(im);
                }
                this.enroll = new Enroll(faceId, images);
                this.presentToast('Thanks Successfully registered');
                this.tts.speak('Thanks Successfully registered');
              }
              else {

                this.presentToast(data.Errors[0].Message);
                this.tts.speak((data.Errors[0].Message));
              }
              this.loading.dismiss();

            },
            error => {
              this.loading.dismiss();
            })
        }

  }

  verify() {
    if (this.base64Image != null) {
      this.loading.present();
      this.service.verifyUsers(this.base64Image).
        then(data => {
          if (data.images) {
            this.presentToast("Welcocme" + data.images[0].transaction.subject_id);
            this.tts.speak("Welcocme" + data.images[0].transaction.subject_id);
          }
          else {
            this.presentToast(data.Errors[0].Message);
            this.tts.speak(data.Errors[0].Message);
          }
          this.loading.dismiss();

        }
        )
    }
    else {
      this.loading.dismiss();
      this.presentToast('Please click your picture to verify !');
      this.tts.speak('Please click your picture to verify !');
    }
  }

  // To detect faces in image
  detect() {
    this.service.detectUser(this.base64Image).
      then(data => {
        console.log(data)
      }
      )

    console.log("name" + this.base64Image);
  }



  presentToast(msg: string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      showCloseButton: true,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


}