import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PainelAnimalComponent } from './painel-animal.component';

describe('PainelAnimalComponent', () => {
  let component: PainelAnimalComponent;
  let fixture: ComponentFixture<PainelAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PainelAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PainelAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
