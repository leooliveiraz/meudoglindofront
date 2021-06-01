import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListaAnimalComponent } from './lista-animal.component';

describe('ListaAnimalComponent', () => {
  let component: ListaAnimalComponent;
  let fixture: ComponentFixture<ListaAnimalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
