import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CameraPreview } from '@ionic-native/camera-preview';

import { TextToSpeech } from '@ionic-native/text-to-speech';
 
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { KairoServiceProvider } from '../providers/kairo-service/kairo-service';
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,    
    CameraPreview,
    TextToSpeech,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    KairoServiceProvider
  ]
})
export class AppModule {}