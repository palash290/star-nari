import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { integerValidator, NoWhitespaceDirective, passwordMatchValidator, passwordMismatchValidator, strongPasswordValidator } from '../../helper/validators';
import { ValidationErrorService } from '../../services/validation-error.service';
import { CommonModule } from '@angular/common';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzMessageService } from 'ng-zorro-antd/message';
import { QuillModule } from 'ngx-quill';
import { browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { CommonService } from '../../services/common.service';
import { Auth } from '@angular/fire/auth';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-log-in',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  Form: FormGroup;
  loading: boolean = false;
  googleDetail: any;


  constructor(private auth: Auth, private fb: FormBuilder, public validationErrorService: ValidationErrorService, private toastr: NzMessageService, private service: CommonService, private route: ActivatedRoute,  private http: HttpClient) {
    this.Form = this.fb.group({
      numbar: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20), NoWhitespaceDirective.validate]],
    });
  }

  // ngOnInit(): void {
  //   this.toastr.success('Welcome to ZYNQ');
  // }
  ngOnInit() {
    // Check if LinkedIn redirected back with a "code"
    // this.route.queryParams.subscribe(params => {
    //   const code = params['code'];
    //   if (code) {
    //     console.log('LinkedIn authorization code:', code);
    //     this.getAccessToken(code);
    //   }
    // });

    const params = new URLSearchParams(window.location.search);
  const code = params.get('code');
  if (code) {
    this.getAccessToken(code);
    // Clean up URL so user doesn't see ?code=XYZ
    window.history.replaceState({}, document.title, window.location.pathname);
  }
  }


  async signInWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this.auth, provider, browserPopupRedirectResolver);
      console.log('User signed in:', result.user);
      this.googleLogin(result.user);
      // this.apiService.setShowBtn(true);
      //this.googleDetail = result.user;
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  }

  googleLogin(userDet: any) {
    //this.loginForm.markAllAsTouched();

    this.loading = true;

    const fullName = userDet.displayName; // Example: "Palash Jain"
    const [firstName, ...rest] = fullName.split(' '); // Split by space
    const lastName = rest.join(' '); // Join the remaining parts as last name

    const formURlData = new URLSearchParams();
    formURlData.set('first_name', firstName);
    formURlData.set('last_name', lastName);
    formURlData.set('email', userDet.email);
    formURlData.set('profile_image', userDet.photoURL);
    this.service.post('google-login', formURlData.toString()).subscribe({
      next: (resp: any) => {
        if (resp.success == true) {
          // this.apiService.setToken(resp.data);
          this.toastr.success(resp.message);
          this.loading = false;
          // this.closeModal.nativeElement.click();
          // this.apiService.setShowBtn(true);
          window.location.reload();
        } else {
          this.toastr.warning(resp.message);
          this.loading = false;
        }
      },
      error: (error) => {
        this.loading = false;
        this.toastr.error('Something went wrong!');
        // if (error.error.message) {
        //   this.toastr.error(error.error.message);
        // } else {
        //   this.toastr.error('Something went wrong!');
        // }
      }
    });

  }


  signInWithLinkedIn() {
    const clientId = '782bppslw7ms0r';
    const redirectUri = 'http://localhost:4200/';
    const scope = 'openid profile email';
    const state = Math.random().toString(36).substring(2);

    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${state}&scope=${encodeURIComponent(scope)}`;

    window.location.href = authUrl;
  }

  getAccessToken(code: string) {
    const clientId = '782bppslw7ms0r';
    const clientSecret = 'WPL_AP1.PpK443HdIrIHPTN1.x7+gJQ==';
    const redirectUri = 'http://localhost:4200/';

    const body = new URLSearchParams();
    body.set('grant_type', 'authorization_code');
    body.set('code', code);
    body.set('redirect_uri', redirectUri);
    body.set('client_id', clientId);
    body.set('client_secret', clientSecret);

    this.http
      .post('https://www.linkedin.com/oauth/v2/accessToken', body.toString(), {
        headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
      })
      .subscribe((res: any) => {
        const token = res.access_token;
        this.getLinkedInProfile(token);
      });
  }

  getLinkedInProfile(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    // Fetch LinkedIn basic profile
    this.http.get('https://api.linkedin.com/v2/me', { headers }).subscribe((profile: any) => {
      // Fetch LinkedIn email
      this.http
        .get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', { headers })
        .subscribe((emailRes: any) => {
          const user = {
            firstName: profile.localizedFirstName,
            lastName: profile.localizedLastName,
            email: emailRes.elements[0]['handle~'].emailAddress,
            profileImage:
              profile.profilePicture?.['displayImage~']?.elements?.[0]?.identifiers?.[0]?.identifier || '',
          };
          console.log('LinkedIn User:', user);
        });
    });
  }


}
