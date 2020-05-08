import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VermifugarComponent } from './vermifugar.component';

describe('VermifugarComponent', () => {
  let component: VermifugarComponent;
  let fixture: ComponentFixture<VermifugarComponent>;

  beforeEach(async(() => {
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
