import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { StoryViewerComponent } from '../story-viewer/story-viewer.component';
import { UploadStoryComponent } from '../upload-story/upload-story.component';
declare var $: any;

export interface Story {
  id: number;
  userName: string;
  profilePic: string;
  media: { type: 'image' | 'video'; url: string; duration: number }[];
}

@Component({
  selector: 'app-story-list',
  imports: [CommonModule, StoryViewerComponent, UploadStoryComponent],
  templateUrl: './story-list.component.html',
  styleUrl: './story-list.component.css'
})
export class StoryListComponent {

  ngOnInit(): void {
    setTimeout(() => {
      $('.ct_story_slider_1').owlCarousel({
        loop: false,
        margin: 5,
        nav: false,
        dots: false,
        responsive: {
          0: {
            items: 4
          },
          1200: {
            items: 6
          },
          1600: {
            items: 11
          }
        }
      });
    }, 100);

    $('#ct_story_view_modal').on('shown.bs.modal', () => {
      this.initStoryModalCarousel();
    });
  }

  initStoryModalCarousel() {
    setTimeout(() => {
      const el = $('.ct_story_view_modal_slider');
      // Destroy if already initialized (important)
      el.trigger('destroy.owl.carousel');
      // Reinitialize
      el.owlCarousel({
        loop: true,
        center: true,
        margin: 30,
        nav: true,
        dots: false,
        responsive: {
          0: {
            items: 1
          },
          600: {
            items: 3
          },
          1000: {
            items: 3
          }
        }
      });

    }, 100);
  }

  activeIndex: number | null = null;

  stories: Story[] = [
    {
      id: 1,
      userName: 'Alice',
      profilePic: 'https://randomuser.me/api/portraits/women/68.jpg',
      media: [
        { type: 'image', url: '/img/product_img_1.png', duration: 4 },
        { type: 'image', url: '/img/product_img_2.jpg', duration: 4 },
      ]
    },
    {
      id: 2,
      userName: 'Bob',
      profilePic: 'https://randomuser.me/api/portraits/men/72.jpg',
      media: [
        { type: 'video', url: '/img/video4.mp4', duration: 8 },
        { type: 'image', url: '/img/product_img_3.jpg', duration: 4 },
      ]
    },
    {
      id: 3,
      userName: 'Sam',
      profilePic: 'https://randomuser.me/api/portraits/women/69.jpg',
      media: [
        { type: 'image', url: '/img/product_img_4.jpg', duration: 4 },
        { type: 'image', url: '/img/product_img_1.png', duration: 4 }
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
        { type: 'image', url: '/img/product_img_3.jpg', duration: 4 },
        { type: 'image', url: '/img/product_img_4.jpg', duration: 4 }
      ]
    },
    {
      id: 6,
      userName: 'Tim',
      profilePic: 'https://randomuser.me/api/portraits/men/75.jpg',
      media: [
        { type: 'video', url: '/img/video3.mp4', duration: 8 },
        { type: 'image', url: '/img/product_img_1.png', duration: 4 },
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
