import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

import { PhotoEditorSDKUI, EditorApi } from 'photoeditorsdk/no-polyfills';
import { RouterLink } from "@angular/router";
import { HeaderComponent } from '../header/header.component';

const license = environment.photoEditorLicense;

@Component({
  selector: 'app-my-profile',
  imports: [CommonModule, RouterLink, HeaderComponent],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {

  @Input()
  public src: string = '';

  @ViewChild('psdkContainer', { static: false })
  private container: ElementRef<HTMLDivElement> | null = null;

  @ViewChild('fileInput', { static: false })
  private fileInput!: ElementRef<HTMLInputElement>;

  public editor: EditorApi | null = null;

  ngAfterViewInit() {
    this.initEditor('');
  }

  async initEditor(imageUrl: string) {
    try {
      if (this.editor) {
        this.editor.dispose();
      }

      this.editor = await PhotoEditorSDKUI.init({
        license,
        container: this.container ? this.container.nativeElement : '',
        image: imageUrl || 'https://img.ly/static/libraries/unsplash/raw/PZAxzN5DPkc.jpg',
        // video: imageUrl,
        assetBaseUrl: '/assets/photoeditorsdk',
      });
    } catch (error) {
      console.log(error);
    }
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const imageUrl = reader.result as string;
        await this.initEditor(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  }
  
  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }


}