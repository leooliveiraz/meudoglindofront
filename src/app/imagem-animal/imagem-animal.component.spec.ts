import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImagemAnimalComponent } from './imagem-animal.component';

describe('ImagemAnimalComponent', () => {
  let component: ImagemAnimalComponent;
  let fixture: ComponentFixture<ImagemAnimalComponent>;

  beforeEach(waitForAsync(() => {
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
