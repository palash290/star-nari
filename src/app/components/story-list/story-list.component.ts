import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StoryViewerComponent } from '../story-viewer/story-viewer.component';

export interface Story {
  id: number;
  userName: string;
  profilePic: string;
  media: { type: 'image' | 'video'; url: string; duration: number }[];
}

@Component({
  selector: 'app-story-list',
  imports: [CommonModule, StoryViewerComponent],
  templateUrl: './story-list.component.html',
  styleUrl: './story-list.component.css'
})
export class StoryListComponent {

  activeIndex: number | null = null;

  stories: Story[] = [
    {
      id: 1,
      userName: 'Alice',
      profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
      media: [
        { type: 'image', url: '/img/1.jpg', duration: 4 },
        { type: 'image', url: '/img/2.jpg', duration: 4 },
      ]
    },
    {
      id: 2,
      userName: 'Bob',
      profilePic: 'https://randomuser.me/api/portraits/men/72.jpg',
      media: [
        { type: 'video', url: '/img/video6.mp4', duration: 8 },
        { type: 'image', url: '/img/1.jpg', duration: 4 },
      ]
    },
    {
      id: 3,
      userName: 'Sam',
      profilePic: 'https://randomuser.me/api/portraits/women/69.jpg',
      media: [
        { type: 'image', url: '/img/3.png', duration: 4 },
        { type: 'image', url: '/img/4.jpg', duration: 4 }
      ]
    },
    {
      id: 4,
      userName: 'David',
      profilePic: 'https://randomuser.me/api/portraits/men/73.jpg',
      media: [
        { type: 'video', url: '/img/video1.mp4', duration: 8 },
        { type: 'video', url: '/img/video2.mp4', duration: 8 },
      ]
    },
    {
      id: 5,
      userName: 'Alina',
      profilePic: 'https://randomuser.me/api/portraits/women/74.jpg',
      media: [
        { type: 'image', url: '/img/6.jpg', duration: 4 },
        { type: 'image', url: '/img/1.jpg', duration: 4 }
      ]
    },
    {
      id: 6,
      userName: 'Tim',
      profilePic: 'https://randomuser.me/api/portraits/men/75.jpg',
      media: [
        { type: 'video', url: '/img/video3.mp4', duration: 8 },
        { type: 'image', url: '/img/4.jpg', duration: 4 },
      ]
    },
  ];

  openStory(i: number) {
    this.activeIndex = i;
  }

  closeViewer() {
    this.activeIndex = null;
  }


}
