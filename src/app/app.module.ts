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

import { NgModule, LOCALE_ID } from '@angular/core';

import { NgCalendarModule  } from 'ionic2-calendar';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';


//import { SQLite } from '@ionic-native/sqlite';
//import { DatePicker } from '@ionic-native/date-picker/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';



import { Platform } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

import { Demo2Page } from './demo2/demo2.page';
import { DemoComponent } from './demo/demo.component';

import { ModalPageModule } from './modal/modal.module';

//import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite } from '@ionic-native/sqlite/ngx';

import { DatabaseService } from './providers/database/database.service';

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
        AppRoutingModule,
        ModalPageModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,        
        UniqueDeviceID,
        BackgroundMode,
        LocalNotifications,
        NativeAudio,
        DatabaseService,
        NavController,
        Platform,
        //DatePicker,        
        SQLite,        
        SQLitePorter,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        InAppBrowser,        
        AndroidPermissions,        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
