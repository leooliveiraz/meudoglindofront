import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VermifugarComponent } from './vermifugar.component';

describe('VermifugarComponent', () => {
  let component: VermifugarComponent;
  let fixture: ComponentFixture<VermifugarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VermifugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VermifugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
