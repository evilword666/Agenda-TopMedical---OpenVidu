import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { VideoAsistenciaPage } from './video-asistencia.page';

const routes: Routes = [
  {
    path: '',
    component: VideoAsistenciaPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [VideoAsistenciaPage]
})
export class VideoAsistenciaPageModule {}
