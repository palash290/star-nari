import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import CreativeEditorSDK from '@cesdk/cesdk-js';

@Component({
  selector: 'app-photo-editor',
  standalone: true, // ✅ Required when using `imports` directly
  imports: [CommonModule],
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'] // ✅ Must be plural: styleUrls, not styleUrl
})
export class PhotoEditorComponent implements AfterViewInit {
  @ViewChild('cesdk_container', { static: false }) containerRef!: ElementRef<HTMLDivElement>; // ✅ Removed trailing space in the reference name

  private instance: any;
  sceneReady = false;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeCESDK();
    }, 1000);
  }

  private async initializeCESDK() {
    if (!this.containerRef?.nativeElement) {
      console.error('❌ Container not found in the DOM.');
      return;
    }

    const config: any = {
      license: 'GtARY0IQ0tzLxAmZfavBpG-SaAlwhkRHUPOGqL3IIthMk_YrwtX9wB8lQ0BMAEwF',
      baseURL: '/assets/cesdk',
      callbacks: { onUpload: 'local' },
      // image: 'https://cdn.img.ly/assets/example-assets/berlin.jpg',
    };

    try {
      console.log('🕓 Initializing CE.SDK...');
      this.instance = await CreativeEditorSDK.create(this.containerRef.nativeElement, config);
      await this.instance.addDefaultAssetSources();
      await this.instance.addDemoAssetSources({ sceneMode: 'Video' });

      // Create a new design scene
      await this.instance.createDesignScene();

      this.sceneReady = true;
      console.log('✅ CreativeEditorSDK initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing CE.SDK:', error);
    }
  }

  async onFileSelected(event: Event) {

    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;

    if (!this.instance) {
      console.warn('⚠️ CE.SDK not ready yet.');
      return;
    }

    console.log('📤 Uploading:', file.name);
    const blobURL = URL.createObjectURL(file);

    try {
      const page = this.instance.engine.block.findByType('page')[0];
      if (!page) {
        console.warn('⚠️ No page found in scene.');
        return;
      }

      if (file.type.startsWith('image/')) {
        debugger
        const imageBlock = await this.instance.engine.block.export(blobURL);
        await this.instance.loadFromImage(page, imageBlock);
        console.log('✅ Image loaded successfully');
      } else if (file.type.startsWith('video/')) {
        const videoBlock = await this.instance.engine.block.createFromVideo(blobURL);
        await this.instance.engine.block.appendChild(page, videoBlock);
        console.log('✅ Video loaded successfully');
      } else {
        console.warn('⚠️ Unsupported file type.');
      }
    } catch (error) {
      console.error('❌ Error loading file into CE.SDK:', error);
    }
  }
}
