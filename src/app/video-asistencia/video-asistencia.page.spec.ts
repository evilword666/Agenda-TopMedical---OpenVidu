import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAsistenciaPage } from './video-asistencia.page';

describe('VideoAsistenciaPage', () => {
  let component: VideoAsistenciaPage;
  let fixture: ComponentFixture<VideoAsistenciaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoAsistenciaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
