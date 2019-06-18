import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ModalComponent } from './modal/modal.component';
import { ModificarCitaComponent } from './modificar-cita/modificar-cita.component';
import { OpenviduVideoAsistenciaComponent } from './openvidu-video-asistencia/openvidu-video-asistencia.component';
import { HttpModule } from '@angular/http';
import { NavController, NavParams } from '@ionic/angular';
import { DatabaseService } from './database.service';

import { NgCalendarModule  } from 'ionic2-calendar';
import { UniqueDeviceID } from '@ionic-native/unique-device-id/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';



@NgModule({
    declarations: [
        AppComponent, 
        UserVideoComponent, 
        OpenViduVideoComponent, 
        HomeComponent, 
        LoginComponent, 
        ModalComponent, 
        ModificarCitaComponent, 
        OpenviduVideoAsistenciaComponent
    ],
    entryComponents: [
        AppComponent, 
        UserVideoComponent, 
        OpenViduVideoComponent, 
        HomeComponent, 
        LoginComponent, 
        ModalComponent, 
        ModificarCitaComponent, 
        OpenviduVideoAsistenciaComponent
    ],
    imports: [
        NgCalendarModule,
        BrowserModule, 
        FormsModule, 
        IonicModule.forRoot(), 
        HttpClientModule,
        HttpModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        NavController,
        UniqueDeviceID,
        BackgroundMode,
        LocalNotifications,
        NativeAudio,
        DatabaseService,
        SQLite,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AndroidPermissions,        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
