import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';
import { CommonService } from '../../services/common.service';
import { MyProfileComponent } from '../my-profile/my-profile.component';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { HeaderComponent } from '../header/header.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

declare var bootstrap: any;

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, HeaderComponent, RouterLink, ImageCropperComponent, FormsModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  // imageChangedEvent: Event | null = null;
  // croppedImage: SafeUrl = '';
  // croppedFile: Blob | null = null;

  Form!: FormGroup;
  profileData: any;
  imageChangedEvent: any = '';
  imagePreview: string | null = null;
  profileImage: any;
  croppedImageBlob: any = '';
  intrests: any;
  loading: boolean = false;
  croppedImage: any = null;
  @ViewChild('closeBtn') closeBtn!: ElementRef<HTMLButtonElement>

  constructor(private fb: FormBuilder,
    private service: CommonService, private toastr: NzMessageService) { }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBlob = event.blob
    this.croppedImage = event.objectUrl
  }

  ngOnInit() {
    this.getIntrests();
    this.getDetails();
    this.Form = this.fb.group({
      name: [' ', [Validators.required]],
      dob: [' ', [Validators.required]],
      bio: [' ', [Validators.required]],
    });
  }

  getDetails() {
    this.service.get('user/profile').subscribe({
      next: (resp: any) => {
        const dob = this.formatDate(resp.data.dob);
        this.Form.patchValue({
          name: resp.data.full_name,
          dob: dob,
          bio: resp.data.bio,
        });
        this.selectedIds = resp.data.interests.map((x: any) => x.interest_id);
        // this.name = resp.data.full_name;
        this.croppedImage = resp.data.profile_image;
      },
      error: (error) => {
        console.log(error || 'Something went wrong!');
      }
    });
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';

    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  getIntrests() {
    this.service.get('public/intrests').subscribe({
      next: (resp: any) => {
        this.intrests = resp.data;
      },
      error: (error) => {
        console.log(error || 'Something went wrong!');
      }
    });
  }

  selectedIds: number[] = [];

  toggleInterest(item: any) {
    const index = this.selectedIds.indexOf(item.interest_id);

    if (index === -1) {
      this.selectedIds.push(item.interest_id);
    } else {
      this.selectedIds.splice(index, 1);
    }
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

  onSubmit() {
    this.Form.markAllAsTouched()
    if (this.Form.valid) {
      this.loading = true
      if (this.selectedIds.length == 0) {
        this.toastr.warning('Please select atleast one intrest.')
        return
      }
      const formData = new FormData();
      if (this.profileImage) {
        formData.append('profile_image', this.profileImage, 'cropped-image.png');
      }
      formData.append('interests_ids', this.selectedIds.join(','));
      formData.append('full_name', this.Form.value.name);
      formData.append('dob', this.Form.value.dob);
      formData.append('bio', this.Form.value.bio);

      this.service.post('user/profile', formData).subscribe({
        next: (res: any) => {
          this.loading = false;
          this.toastr.success(res.message);
        },
        error: (err) => {
          this.loading = false;
          console.error('Upload failed:', err);
        }
      });
    }
  }


}
