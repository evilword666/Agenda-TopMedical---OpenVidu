import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';

import { OpenViduVideoComponent } from './openvidu-video-asistencia/ov-video.component';
import { UserVideoComponent } from './openvidu-video-asistencia/user-video.component';

import { OpenviduVideoAsistenciaComponent } from './openvidu-video-asistencia/openvidu-video-asistencia.component';
import { HttpModule } from '@angular/http';
import { NavController, NavParams } from '@ionic/angular';
//import { DatabaseService } from './database.service';
import { NgModule, LOCALE_ID } from '@angular/core';

import { NgCalendarModule  } from 'ionic2-calendar';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

import { Demo2Page } from './demo2/demo2.page';
import { DemoComponent } from './demo/demo.component';




@NgModule({
    declarations: [
        AppComponent, 
        UserVideoComponent, 
        OpenViduVideoComponent, 

        OpenviduVideoAsistenciaComponent, 
        
        Demo2Page, 
        DemoComponent
    ],
    entryComponents: [
        AppComponent, 
        UserVideoComponent, 
        OpenViduVideoComponent, 
 
        OpenviduVideoAsistenciaComponent,
        DemoComponent,
        Demo2Page
    ],
    imports: [
        NgCalendarModule,
        BrowserModule, 
        FormsModule, 
        
        IonicModule.forRoot(), 
        HttpClientModule,
        HttpModule,
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,        
        UniqueDeviceID,
        BackgroundMode,
        LocalNotifications,
        NativeAudio,
        //DatabaseService,
        NavController,
        Platform,

        SQLite,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        
        AndroidPermissions,        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
