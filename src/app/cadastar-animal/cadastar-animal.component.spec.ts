import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastarAnimalComponent } from './cadastar-animal.component';

describe('CadastarAnimalComponent', () => {
  let component: CadastarAnimalComponent;
  let fixture: ComponentFixture<CadastarAnimalComponent>;

  beforeEach(async(() => {
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
