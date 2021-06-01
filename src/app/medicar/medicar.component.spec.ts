import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MedicarComponent } from './medicar.component';

describe('MedicarComponent', () => {
  let component: MedicarComponent;
  let fixture: ComponentFixture<MedicarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
