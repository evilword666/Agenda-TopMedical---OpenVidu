import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { OpenviduVideoAsistenciaComponent } from './openvidu-video-asistencia/openvidu-video-asistencia.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'video-asistencia', loadChildren: './video-asistencia/video-asistencia.module#VideoAsistenciaPageModule' },
  { path: 'demo2', loadChildren: './demo2/demo2.module#Demo2PageModule' },
  { path: 'videoasistencia', component: OpenviduVideoAsistenciaComponent }
  //{ path: 'OpenviduVideoAsistenciaComponent', loadChildren: './OpenviduVideoAsistenciaComponent#OpenviduVideoAsistenciaComponent' },  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
