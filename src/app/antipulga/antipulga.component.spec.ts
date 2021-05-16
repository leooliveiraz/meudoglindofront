import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntipulgaComponent } from './antipulga.component';

describe('AntipulgaComponent', () => {
  let component: AntipulgaComponent;
  let fixture: ComponentFixture<AntipulgaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntipulgaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntipulgaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
