import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CadastarAnimalComponent } from './cadastar-animal.component';

describe('CadastarAnimalComponent', () => {
  let component: CadastarAnimalComponent;
  let fixture: ComponentFixture<CadastarAnimalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastarAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastarAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
