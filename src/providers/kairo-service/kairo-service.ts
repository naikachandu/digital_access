import { Injectable } from '@angular/core';
import { Http,RequestOptions,Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the KairoServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class KairoServiceProvider {
apiUrl ='https://api.kairos.com/enroll';
apiVerifyUrl='https://api.kairos.com/verify';
data:any;
  constructor(public http: Http) {
    console.log('Hello KairoServiceProvider Provider');
  }
getUsers(img:string,name:string) {
  if (this.data) {
    return Promise.resolve(this.data);
  }
  let opt:RequestOptions;
  let myHeader: Headers = new Headers;

  myHeader.set('app_id','4ec9c86e');
  myHeader.set('app_key','44fe501a7332e23b8cc2ee6f47b085c6');
  myHeader.append('Content-Type','application/json');

  opt=new RequestOptions({headers : myHeader});

  let postParams={
      "image":img,
    "subject_id":name,
    "gallery_name":"MyGallery"
  }

  return new Promise(resolve => {
    this.http.post(this.apiUrl,postParams,opt)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
  });
}

VerifyUsers(img:string,name:string) {
  if (this.data) {
    return Promise.resolve(this.data);
  }
  let opt:RequestOptions;
  let myHeader: Headers = new Headers;

  myHeader.set('app_id','4ec9c86e');
  myHeader.set('app_key','44fe501a7332e23b8cc2ee6f47b085c6');
  myHeader.append('Content-Type','application/json');

  opt=new RequestOptions({headers : myHeader});

  let postParams={
      "image":img,
    "subject_id":name,
    "gallery_name":"MyGallery"
  }

  return new Promise(resolve => {
    this.http.post(this.apiVerifyUrl,postParams,opt)
      .map(res => res.json())
      .subscribe(data => {
        this.data = data;
        resolve(this.data);
      });
  });
}
}
