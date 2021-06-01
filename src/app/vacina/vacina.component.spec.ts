import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VacinaComponent } from './vacina.component';

describe('VacinaComponent', () => {
  let component: VacinaComponent;
  let fixture: ComponentFixture<VacinaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VacinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
