import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { CommonService } from '../../services/common.service';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, PhotoEditorComponent, HeaderComponent, RouterLink],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  // imageChangedEvent: Event | null = null;
  // croppedImage: SafeUrl = '';
  // croppedFile: Blob | null = null;

  imageChangedEvent: any = '';
  imagePreview: string | null = null;
  profileImage: any;
  croppedImageBlob: any = '';
  croppedImage: any = '';
  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>

  constructor(
    private service: CommonService
  ) {
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBlob = event.blob
    this.croppedImage = event.objectUrl
  }

  onDone() {
    this.imagePreview = this.croppedImage
    this.profileImage = new File([this.croppedImageBlob], 'profile.png', {
      type: 'image/png'
    })
    this.closeBtn.nativeElement.click()
  }

  openModal() {
    const modalElement = document.getElementById('ct_feedback_detail_modal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  onProfileImage(event: any): void {
    this.imageChangedEvent = event
    this.openModal()
  }

  uploadCroppedImage() {
    if (!this.profileImage) {
      console.warn('No image to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', this.profileImage, 'cropped-image.png');

    this.service.post('your-api-endpoint', formData).subscribe({
      next: (res) => {
        console.log('Upload successful:', res);
      },
      error: (err) => {
        console.error('Upload failed:', err);
      }
    });
  }


}
