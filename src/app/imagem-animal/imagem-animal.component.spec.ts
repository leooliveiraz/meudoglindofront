import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagemAnimalComponent } from './imagem-animal.component';

describe('ImagemAnimalComponent', () => {
  let component: ImagemAnimalComponent;
  let fixture: ComponentFixture<ImagemAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImagemAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagemAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
