import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-verify-instruction',
  imports: [CommonModule, RouterLink],
  templateUrl: './verify-instruction.component.html',
  styleUrl: './verify-instruction.component.css'
})
export class VerifyInstructionComponent {

  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  capturedImage: string | null = null;
  stream!: MediaStream;

  ngOnInit() {
    this.startCamera();
  }

  startCamera() {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        this.stream = stream;
        this.video.nativeElement.srcObject = stream;
      })
      .catch(err => {
        console.error('Error accessing camera: ', err);
      });
  }

  capturePhoto() {
    const canvas = document.createElement('canvas');
    canvas.width = this.video.nativeElement.videoWidth;
    canvas.height = this.video.nativeElement.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(this.video.nativeElement, 0, 0, canvas.width, canvas.height);
      this.capturedImage = canvas.toDataURL('image/png');
    }
  }

  downloadImage() {
    if (!this.capturedImage) return;

    const link = document.createElement('a');
    link.href = this.capturedImage;
    link.download = 'captured-image.png';
    link.click();
  }

  ngOnDestroy() {
    // Stop the camera when component is destroyed
    this.stream?.getTracks().forEach(track => track.stop());
  }

  
}
