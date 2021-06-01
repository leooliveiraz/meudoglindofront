import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExameComponent } from './exame.component';

describe('ExameComponent', () => {
  let component: ExameComponent;
  let fixture: ComponentFixture<ExameComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ExameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
