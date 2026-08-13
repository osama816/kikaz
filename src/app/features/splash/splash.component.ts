import {
  Component,
  OnInit,
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
export class SplashComponent implements OnInit, AfterViewInit {
  @Output() splashDone = new EventEmitter<void>();
  @ViewChild('splashEl') splashEl!: ElementRef<HTMLElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.runAnimation();
    }
  }

  private async runAnimation(): Promise<void> {
    const { gsap } = await import('gsap');
    const el = this.splashEl.nativeElement;

    const tl = gsap.timeline({ onComplete: () => this.finish() });

    // Logo letters pop in one by one
    tl.fromTo(
      el.querySelectorAll('.letter'),
      { scale: 0, rotation: -20, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.08, stagger: 0.08, ease: 'back.out(2)' }
    )
    // Subtitle slides up
    .fromTo(
      el.querySelector('.subtitle'),
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.1'
    )
    // Badge spins in
    .fromTo(
      el.querySelector('.oh-so-good'),
      { scale: 0, rotation: -180, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.6, ease: 'back.out(3)' },
      '-=0.3'
    )
    // Decorative stars pop
    .fromTo(
      el.querySelectorAll('.deco-star'),
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'back.out(3)' },
      '-=0.4'
    )
    // Hold then exit
    .to({}, { duration: 0.9 })
    .to(el, { y: '-100%', duration: 0.5, ease: 'power3.in' });
  }

  private finish(): void {
    this.splashDone.emit();
  }
}
