import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PesarComponent } from './pesar.component';

describe('PesarComponent', () => {
  let component: PesarComponent;
  let fixture: ComponentFixture<PesarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PesarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
