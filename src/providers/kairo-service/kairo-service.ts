import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import 'rxjs/add/operator/map';

/*
  Generated class for the KairoServiceProvider provider.
 
  See https://a...content-available-to-author-only...r.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class KairoServiceProvider {
  apiUrl = 'https://api.kairos.com/enroll';
  apiVerifyUrl = 'https://api.kairos.com/recognize';
  apiDetectUrl='https://api.kairos.com/detect';
  mockUrl = 'http://localhost:8100/assets/mock/enroll.json';
  mockMsgUrl='http://localhost:8100/assets/mock/enroll_error.json'
  opt: RequestOptions;
  data:any;


  constructor(public http: Http) {
    let myHeader: Headers = new Headers;
    myHeader.set('app_id', '4ec9c86e');
    myHeader.set('app_key', '44fe501a7332e23b8cc2ee6f47b085c6');
    myHeader.append('Content-Type', 'application/json');
    this.opt = new RequestOptions({ headers: myHeader });
  }


  getUsers(img: string, name: string) {
    if (this.data) {
      console.log('hi data')
      return Promise.resolve(this.data);
    }
    let postParams = {
      "image": img,
      "subject_id": name,
      "gallery_name": "MyGallery"
    }

    return new Promise(resolve => {
      this.http.post(this.apiUrl, postParams, this.opt)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log("Data returned" + JSON.stringify(this.data));
          resolve(this.data);
        });
    });

  }

  verifyUsers(img: string) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    let postParams = {
      "image": img,
      "gallery_name": "MyGallery"
    }

    return new Promise(resolve => {
      this.http.post(this.apiVerifyUrl, postParams, this.opt)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
  detectUser(img: string) {
    if (this.data) {
      return Promise.resolve(this.data);
    }
    let postParams = {
      "image": img,
    }

    return new Promise(resolve => {
      this.http.post(this.apiDetectUrl, postParams, this.opt)
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }
}
