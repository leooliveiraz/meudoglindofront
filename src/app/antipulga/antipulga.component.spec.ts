import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AntipulgaComponent } from './antipulga.component';

describe('AntipulgaComponent', () => {
  let component: AntipulgaComponent;
  let fixture: ComponentFixture<AntipulgaComponent>;

  beforeEach(waitForAsync(() => {
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
