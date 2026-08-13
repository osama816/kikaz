import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { SplashComponent } from './features/splash/splash.component';
import { MenuComponent } from './features/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SplashComponent, MenuComponent],
  template: `
    @if (showSplash()) {
      <app-splash (splashDone)="onSplashDone()" />
    }
    <app-menu [class.hidden-until-ready]="showSplash()" />
  `,
  styles: [`
    :host { display: block; }
    .hidden-until-ready { visibility: hidden; }
  `],
})
export class App {
  showSplash = signal(true);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    // Skip splash on server-side rendering
    if (!isPlatformBrowser(this.platformId)) {
      this.showSplash.set(false);
    }
  }

  onSplashDone(): void {
    this.showSplash.set(false);
  }
}
