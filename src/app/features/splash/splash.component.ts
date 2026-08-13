import {
  Component,
  AfterViewInit,
  Output,
  EventEmitter,
  Inject,
  PLATFORM_ID,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.css'],
})
export class SplashComponent implements AfterViewInit {
  @Output() splashDone = new EventEmitter<void>();
  @ViewChild('splashEl') splashEl!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.runAnimation();
    } else {
      // On server just skip splash
      this.splashDone.emit();
    }
  }

  private async runAnimation(): Promise<void> {
    const { gsap } = await import('gsap');
    const el = this.splashEl.nativeElement;
    const tl = gsap.timeline({ onComplete: () => this.finish() });

    // 1. Letters pop in one by one — brand-faithful red on white
    tl.fromTo(
      el.querySelectorAll('.letter'),
      { scale: 0, rotation: -18, opacity: 0, y: 20 },
      { scale: 1, rotation: 0, opacity: 1, y: 0,
        duration: 0.1, stagger: 0.09,
        ease: 'back.out(2.5)' }
    )
    // 2. Subtitle slides up
    .fromTo(
      el.querySelector('.subtitle'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' },
      '-=0.05'
    )
    // 3. Badge spins in from corner
    .fromTo(
      el.querySelector('.ohsogood-badge'),
      { scale: 0, rotation: -200, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.55, ease: 'back.out(3)' },
      '-=0.3'
    )
    // 4. Sparkles pop
    .fromTo(
      el.querySelectorAll('.splash-spark'),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.55, duration: 0.35, stagger: 0.08, ease: 'back.out(3)' },
      '-=0.35'
    )
    // 5. Wrap icon bounces in
    .fromTo(
      el.querySelector('.splash-wrap-icon'),
      { scale: 0, opacity: 0, rotation: -30 },
      { scale: 1, opacity: 1, rotation: 0, duration: 0.45, ease: 'back.out(2)' },
      '-=0.2'
    )
    // 6. Hold
    .to({}, { duration: 0.8 })
    // 7. Exit — whole splash slides UP (like lifting a menu page)
    .to(el, { y: '-102%', duration: 0.55, ease: 'power3.in' });
  }

  private finish(): void {
    this.splashDone.emit();
  }
}
