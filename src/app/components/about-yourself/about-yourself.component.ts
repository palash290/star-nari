import { Component } from '@angular/core';
import { FcmService } from '../../services/fcm.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationErrorService } from '../../services/validation-error.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-about-yourself',
  imports: [CommonModule, RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './about-yourself.component.html',
  styleUrl: './about-yourself.component.css'
})
export class AboutYourselfComponent {

  Form!: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService, private service: CommonService,
    private router: Router) { }

  ngOnInit() {
    this.Form = this.fb.group({
      name: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      bio: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.Form.markAllAsTouched()
    if (this.Form.valid) {
      this.loading = true
      const formURlData = new URLSearchParams()
      formURlData.set('full_name', this.Form.value.name);
      formURlData.set('dob', this.Form.value.dob);
      formURlData.set('bio', this.Form.value.bio);
      this.service
        .post('user/update-profile', formURlData.toString())
        .subscribe({
          next: (resp: any) => {
            if (resp.success == true) {
              this.loading = false;
              this.toastr.success(resp.message);
              this.router.navigateByUrl('/choose-intrest');
            } else {
              this.loading = false;
              this.toastr.warning(resp.message);
            }
          },
          error: (error: any) => {
            this.loading = false;
            this.toastr.warning(error || 'Something went wrong!');
          }
        })
    }
  }


}
