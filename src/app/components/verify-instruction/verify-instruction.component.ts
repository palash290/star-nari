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
  startVarification: boolean = true;

  ngOnInit() {
    
  }

  startVarify(){
    this.startVarification = false;
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
    const video = this.video.nativeElement;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext('2d');
    if (context) {
      // ✅ Fix mirror effect in captured image
      context.translate(canvas.width, 0); // move context to right edge
      context.scale(-1, 1);               // flip horizontally

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      this.capturedImage = canvas.toDataURL('image/png');
    }
  }

  removeImg() {
    this.capturedImage = null;
    this.startCamera();
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
