import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload-component.component.html',
})
export class UploadComponent {
  public imagePath;
  imgURL: any;
  public message: string;

  preview(files) {
    if (files.length === 0) return;

    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = _event => {
      this.imgURL = reader.result;
    };
  }
}
