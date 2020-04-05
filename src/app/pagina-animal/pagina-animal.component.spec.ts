import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaAnimalComponent } from './pagina-animal.component';

describe('PaginaAnimalComponent', () => {
  let component: PaginaAnimalComponent;
  let fixture: ComponentFixture<PaginaAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
