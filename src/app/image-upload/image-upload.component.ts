import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal: any;
  @ViewChild(ImageCropperComponent, {static : false}) imageCropper: ImageCropperComponent;
  @Output() trocarImagemEvent = new EventEmitter();
  @Input() src;

  imagemSelecionada = null;
  srcImage: any = null;

  imageChangedEvent: any = {};
  croppedImage: any = {};
 

  constructor() { }

  ngOnInit() {
  }

  mudar(event) {
    this.imageChangedEvent = event;
    this.imagemSelecionada = event.target.files[0];
    if (this.imagemSelecionada) {
      const reader = new FileReader();
      reader.onload = e => {
        this.modal.openModal();
      };
      reader.readAsDataURL(this.imagemSelecionada);
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  concluirRecorte() {
    this.src = null;
    this.srcImage = this.croppedImage;
    this.trocarImagemEvent.emit(this.srcImage);
  }

  rodarDireita(){
    this.imageCropper.rotateRight();
  }

  rodarEsquerda(){
    this.imageCropper.rotateLeft();
  }
}
