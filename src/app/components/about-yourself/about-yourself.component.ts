import { Component } from '@angular/core';
import { FcmService } from '../../services/fcm.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-yourself',
  imports: [CommonModule, RouterLink],
  templateUrl: './about-yourself.component.html',
  styleUrl: './about-yourself.component.css'
})
export class AboutYourselfComponent {

  constructor(private fcmService: FcmService) { }

  ngOnInit() {
    this.fcmService.listenForMessages();
    this.getFcmToken()
  }

  getFcmToken() {
    this.fcmService.requestPermissionAndGetToken().then(token => {
      if (token) {
        console.log('Token:', token);
      }
    });
  }


}
