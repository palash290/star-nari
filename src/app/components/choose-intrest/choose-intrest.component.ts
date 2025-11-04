import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-choose-intrest',
  imports: [CommonModule, RouterLink],
  templateUrl: './choose-intrest.component.html',
  styleUrl: './choose-intrest.component.css'
})
export class ChooseIntrestComponent {

  isLoading: boolean = false;
  data: any;
  loading: boolean = false;

  constructor(private commonService: CommonService, private toastr: NzMessageService, private router: Router) { }

  ngOnInit() {
    this.getDetails();
  }

  getDetails() {
    this.isLoading = true;
    this.commonService.get('public/intrests').subscribe({
      next: (resp: any) => {
        this.isLoading = false;
        this.data = resp.data;
      },
      error: (error) => {
        this.isLoading = false;
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

  onSubmit() {
    if (this.selectedIds.length == 0) {
      this.toastr.warning('Please select atleast one intrest.')
      return
    }
    this.loading = true
    // const formURlData = new URLSearchParams()
    // formURlData.set('interests_ids', this.selectedIds.join(','));

    const payload = {
      interests_ids: this.selectedIds
    };
    this.commonService
      .post('user/interests', payload)
      .subscribe({
        next: (resp: any) => {
          if (resp.success == true) {
            this.loading = false;
            this.toastr.success(resp.message);
            this.router.navigateByUrl('/main/home');
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
