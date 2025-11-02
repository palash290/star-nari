import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  group,
} from '@angular/animations';

export interface Story {
  id: number;
  userName: string;
  profilePic: string;
  media: { type: 'image' | 'video'; url: string; duration: number }[];
}

@Component({
  selector: 'app-story-viewer',
  imports: [CommonModule],
  templateUrl: './story-viewer.component.html',
  styleUrl: './story-viewer.component.css',
  // animations: [
  //   trigger('storySlideAnimation', [
  //     transition(':increment', [
  //       // going to next user → slide left
  //       group([
  //         query(':enter', [
  //           style({ transform: 'translateX(100%)', opacity: 0 }),
  //           animate('400ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
  //         ]),
  //         query(':leave', [
  //           style({ transform: 'translateX(0)', opacity: 1 }),
  //           animate('400ms ease', style({ transform: 'translateX(-100%)', opacity: 0 }))
  //         ])
  //       ])
  //     ]),
  //     transition(':decrement', [
  //       // going to previous user → slide right
  //       group([
  //         query(':enter', [
  //           style({ transform: 'translateX(-100%)', opacity: 0 }),
  //           animate('400ms ease', style({ transform: 'translateX(0)', opacity: 1 }))
  //         ]),
  //         query(':leave', [
  //           style({ transform: 'translateX(0)', opacity: 1 }),
  //           animate('400ms ease', style({ transform: 'translateX(100%)', opacity: 0 }))
  //         ])
  //       ])
  //     ])
  //   ])
  // ]
})
export class StoryViewerComponent {

  @Input() stories: Story[] = [];
  @Input() activeIndex = 0;
  @Output() close = new EventEmitter<void>();
  @ViewChild('storyVideo') storyVideoRef?: ElementRef<HTMLVideoElement>;

  currentMediaIndex = 0;
  progress = 0;
  interval: any;
  isPaused = false;

  pressStartTime: number | null = null;
  pressThreshold = 200; // ms, adjust as needed
  isLongPress = false;

  get currentUser() {
    return this.stories[this.activeIndex];
  }

  get currentMedia() {
    return this.currentUser.media[this.currentMediaIndex];
  }

  ngOnInit() {
    this.startProgress();
  }

  // startProgress() {
  //   clearInterval(this.interval);
  //   this.progress = 0;
  //   const media = this.currentMedia;
  //   const step = 100 / (media.duration * 10); // 10 times per sec

  //   this.interval = setInterval(() => {
  //     if (!this.isPaused) {
  //       this.progress += step;
  //       if (this.progress >= 100) {
  //         this.nextMedia();
  //       }
  //     }
  //   }, 100);
  // }

  // pause() {
  //   this.isPaused = true;
  //   this.isLongPress = false;
  //   this.pressStartTime = Date.now();

  //   clearInterval(this.interval);

  //   const videoEl = this.storyVideoRef?.nativeElement;
  //   if (videoEl && !videoEl.paused) {
  //     videoEl.pause();
  //   }
  // }

  // resume(event?: MouseEvent | TouchEvent) {
  //   const pressDuration = Date.now() - (this.pressStartTime || 0);
  //   this.isPaused = false;

  //   if (pressDuration > this.pressThreshold) {
  //     // 👇 Long press → pause/resume only, no navigation
  //     this.isLongPress = true;
  //     event?.stopPropagation(); // Prevent tap-zone click event
  //   }

  //   const videoEl = this.storyVideoRef?.nativeElement;
  //   if (videoEl && videoEl.paused) {
  //     videoEl.play();
  //   }

  //   this.startProgress();

  //   this.pressStartTime = null;
  // }

  currentProgressValue = 0; // store current progress during pause

  startProgress(resume = false) {
    clearInterval(this.interval);

    const media = this.currentMedia;
    const step = 100 / (media.duration * 10); // 10 updates per second

    // Only reset to 0 if it's a new media, not a resume
    if (!resume) {
      this.progress = 0;
    }

    this.interval = setInterval(() => {
      if (!this.isPaused) {
        this.progress += step;
        this.currentProgressValue = this.progress; // keep track of where we are
        if (this.progress >= 100) {
          this.nextMedia();
        }
      }
    }, 100);
  }

  pause() {
    this.isPaused = true;
    this.pressStartTime = Date.now();

    clearInterval(this.interval);

    const videoEl = this.storyVideoRef?.nativeElement;
    if (videoEl && !videoEl.paused) {
      videoEl.pause();
    }

    // Save current progress value
    this.currentProgressValue = this.progress;
  }

  resume(event?: MouseEvent | TouchEvent) {
    const pressDuration = Date.now() - (this.pressStartTime || 0);
    this.isPaused = false;

    // If this was a long press, mark it — but clear it shortly after so future taps work
    if (pressDuration > this.pressThreshold) {
      this.isLongPress = true;
      // prevent the tap-zone click in some browsers (optional)
      event?.stopPropagation();

      // clear the long-press flag after 250ms so later taps still work
      setTimeout(() => {
        this.isLongPress = false;
        // console.log optional for debugging:
        // console.log('isLongPress cleared after timeout');
      }, 250);
    }

    const videoEl = this.storyVideoRef?.nativeElement;
    if (videoEl && videoEl.paused) {
      videoEl.play();
    }

    // Resume progress from saved value
    this.progress = this.currentProgressValue;
    this.startProgress(true);

    this.pressStartTime = null;
  }

  getProgress(index: number): number {
    if (index < this.currentMediaIndex) return 100;
    if (index === this.currentMediaIndex) return this.progress;
    return 0;
  }

  nextMedia() {
    if (this.isLongPress) {
      // ignore the click if it was a long press
      return;
    }

    clearInterval(this.interval);
    this.isPaused = false;
    this.isLongPress = false;

    if (this.currentMediaIndex < this.currentUser.media.length - 1) {
      this.currentMediaIndex++;
      this.startProgress();
    } else {
      this.nextUser();
    }

    const videoEl = this.storyVideoRef?.nativeElement;
    if (videoEl) {
      videoEl.currentTime = 0;
      videoEl.play();
    }
  }


  prevMedia() {
    if (this.isLongPress) return;

    clearInterval(this.interval);
    this.isPaused = false;      // ✅ ensure resume state
    this.isLongPress = false;   // ✅ reset long press

    if (this.currentMediaIndex > 0) {
      this.currentMediaIndex--;
      this.startProgress();
    } else {
      this.prevUser();
    }

    const videoEl = this.storyVideoRef?.nativeElement;
    if (videoEl) {
      videoEl.currentTime = 0;
      videoEl.play();
    }
  }

  nextUser() {
    if (this.activeIndex < this.stories.length - 1) {
      this.activeIndex++;
      this.currentMediaIndex = 0;
      this.startProgress();
    } else {
      this.close.emit();
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  prevUser() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
      this.currentMediaIndex = this.stories[this.activeIndex].media.length - 1;
      this.startProgress();
    } else {
      this.close.emit();
    }
  }

  isCommentFocused = false;

  onCommentFocus() {
    debugger
    this.isCommentFocused = true;
    if (!this.isMobile()) {
      this.pause();
    }
  }

  onCommentBlur() {
    debugger
    this.isCommentFocused = false;
    if (!this.isMobile()) {
      this.resume();
    }
  }

  // Helper to detect mobile
  isMobile(): boolean {
    return /Mobi|Android/i.test(navigator.userAgent);
  }


}
