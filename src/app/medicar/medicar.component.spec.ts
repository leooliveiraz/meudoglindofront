import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicarComponent } from './medicar.component';

describe('MedicarComponent', () => {
  let component: MedicarComponent;
  let fixture: ComponentFixture<MedicarComponent>;

  beforeEach(async(() => {
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
