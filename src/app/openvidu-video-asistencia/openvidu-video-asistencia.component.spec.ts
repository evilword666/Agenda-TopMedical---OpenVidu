import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenviduVideoAsistenciaComponent } from './openvidu-video-asistencia.component';

describe('OpenviduVideoAsistenciaComponent', () => {
  let component: OpenviduVideoAsistenciaComponent;
  let fixture: ComponentFixture<OpenviduVideoAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenviduVideoAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenviduVideoAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
