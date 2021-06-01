import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdicionarAnimalCompartilhadoComponent } from './adicionar-animal-compartilhado.component';

describe('AdicionarAnimalCompartilhadoComponent', () => {
  let component: AdicionarAnimalCompartilhadoComponent;
  let fixture: ComponentFixture<AdicionarAnimalCompartilhadoComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdicionarAnimalCompartilhadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarAnimalCompartilhadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
