import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NzInputOtpComponent } from 'ng-zorro-antd/input';
import { NzFlexDirective } from 'ng-zorro-antd/flex';
import { ValidationErrorService } from '../../services/validation-error.service';
import { CommonService } from '../../services/common.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-verify-otp',
  imports: [ReactiveFormsModule, CommonModule, RouterLink,
    NzFlexDirective, NzInputOtpComponent],
  templateUrl: './verify-otp.component.html',
  styleUrl: './verify-otp.component.css'
})
export class VerifyOtpComponent {

  Form: FormGroup;
  atValues: any;
  htmlText: string = '';
  isLoading: boolean = false;
  isLoadingResend: boolean = false;
  isPasswordVisible: boolean = false;
  userNumber: any;
  fcm: any;

  constructor(private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService,
    private service: CommonService, private route: Router, private router: ActivatedRoute
  ) {
    this.Form = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fcm = localStorage.getItem('fcmNari');
    this.router.queryParams.subscribe(params => {
      const email = params['numbar'];
      // Optionally store it in a variable
      this.userNumber = email;
    });
  }


  onSubmit() {
    // this.route.navigateByUrl('/verify-instructions');
    // return
    this.Form.markAllAsTouched()
    if (this.Form.valid) {
      this.isLoading = true;
      const formURlData = new URLSearchParams()
      formURlData.set('phone_number', this.userNumber)
      formURlData.set('otp', this.Form.value.otp)
      // formURlData.set('newPassword', this.Form.value.password)
      this.service
        .post('public/verify-otp', formURlData.toString())
        .subscribe({
          next: (resp: any) => {
            if (resp.success == true) {
              this.isLoading = false;
              localStorage.setItem('nariToken', resp.data.token)
              this.toastr.success(resp.message);
              debugger
              if (resp.data.user.signup_stage == 0) {
                this.route.navigateByUrl('/about-yourself');
              } else if (resp.data.user.signup_stage == 1) {
                this.route.navigateByUrl('/choose-intrest');
              } else if (resp.data.user.signup_stage == 2) {
                this.route.navigateByUrl('/main/home');
              }
            } else {
              this.isLoading = false;
              this.toastr.warning(resp.message);
            }
          },
          error: (error: any) => {
            this.isLoading = false;
            this.toastr.warning(error || 'Something went wrong!');
          }
        })
    }
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  resendOtp() {
    this.isLoadingResend = true
    const formURlData = new URLSearchParams()
    formURlData.set('phone_number', this.userNumber)
    formURlData.set('fcm_token', this.fcm)
    this.service
      .post('public/login', formURlData.toString())
      .subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.isLoadingResend = false;
            this.toastr.success(resp.message);
          } else {
            this.isLoadingResend = false;
            this.toastr.warning(resp.message);
          }
        },
        error: (error: any) => {
          this.isLoadingResend = false;
          this.toastr.warning(error || 'Something went wrong!');
        }
      })
  }


}
