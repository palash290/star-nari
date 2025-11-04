import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { AddPostComponent } from './add-post/add-post.component';
import { StoryListComponent } from '../story-list/story-list.component';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, AddPostComponent, CommonModule, StoryListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {




}
