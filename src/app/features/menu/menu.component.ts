import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  signal,
  computed,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule, isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { MenuItem, MenuCategory, MenuTag } from '../../core/models/menu.model';
import { MENU_ITEMS, MENU_CATEGORIES } from '../../core/data/menu.data';

type SortMode  = 'default' | 'asc' | 'desc';
type FilterKey = MenuTag | 'all';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, UpperCasePipe],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('heroVideo') heroVideo?: ElementRef<HTMLVideoElement>;

  readonly categories = MENU_CATEGORIES;

  // ── Reactive state ─────────────────────────────────────────────
  activeCategory = signal<MenuCategory>('breakfast');
  activeFilter   = signal<FilterKey>('all');
  sortMode       = signal<SortMode>('default');
  selectedItem   = signal<MenuItem | null>(null);
  showModal      = signal(false);
  isClosingModal = signal(false);

  // Video State
  videoFinished    = signal(false);
  isVideoFadingOut = signal(false);

  onVideoEnded(): void {
    this.isVideoFadingOut.set(true);
    setTimeout(() => {
      this.videoFinished.set(true);
    }, 500);
  }

  readonly filterOptions: { key: FilterKey; label: string }[] = [
    { key: 'all',     label: 'ALL'     },
    { key: 'beef',    label: 'BEEF'    },
    { key: 'chicken', label: 'CHICKEN' },
    { key: 'veg',     label: 'VEG'     },
    { key: 'fish',    label: 'FISH'    },
  ];

  readonly categoriesWithItems = computed<{ id: MenuCategory; label: string; icon: string; description: string; count: number; items: MenuItem[]; }[]>(() =>
    this.categories.map(c => ({
      ...c,
      count: MENU_ITEMS.filter(i => i.category === c.id).length,
      items: MENU_ITEMS.filter(i => i.category === c.id),
    }))
  );

  private revealObserver?: IntersectionObserver;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initReveal();
      // Force play video just in case browser autoplay blocks it
      if (this.heroVideo?.nativeElement) {
        this.heroVideo.nativeElement.muted = true;
        this.heroVideo.nativeElement.play().catch(e => console.error('Video autoplay failed:', e));
      }
    }
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
  }

  // ── Scroll reveal ──────────────────────────────────────────────
  private initReveal(): void {
    this.revealObserver?.disconnect();
    this.revealObserver = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.06, rootMargin: '0px 0px -10px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => this.revealObserver!.observe(el));
    }, 60);
  }

  // ── Category ───────────────────────────────────────────────────
  setCategory(cat: MenuCategory): void {
    this.activeCategory.set(cat);
    this.activeFilter.set('all');
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        document.getElementById('menu-main')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.initReveal();
      }, 50);
    }
  }

  scrollToCategory(catId: string): void {
    this.activeCategory.set(catId as MenuCategory);
    if (isPlatformBrowser(this.platformId)) {
      document.getElementById('section-' + catId)?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ── Filter & sort ──────────────────────────────────────────────
  setFilter(f: FilterKey): void { this.activeFilter.set(f); }

  toggleSort(): void {
    const cycle: SortMode[] = ['default', 'asc', 'desc'];
    this.sortMode.set(cycle[(cycle.indexOf(this.sortMode()) + 1) % cycle.length]);
  }

  getSortLabel(): string {
    return { default: '⇅ SORT', asc: '↑ PRICE', desc: '↓ PRICE' }[this.sortMode()];
  }

  // ── Modal ──────────────────────────────────────────────────────
  openItem(item: MenuItem): void {
    this.selectedItem.set(item);
    this.isClosingModal.set(false);
    this.showModal.set(true);
    if (isPlatformBrowser(this.platformId)) document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isClosingModal.set(true);
    setTimeout(() => {
      this.showModal.set(false);
      this.isClosingModal.set(false);
      this.selectedItem.set(null);
      if (isPlatformBrowser(this.platformId)) document.body.style.overflow = '';
    }, 290);
  }

  // ── Actions ────────────────────────────────────────────────────
  callOrder(): void {
    if (isPlatformBrowser(this.platformId)) window.location.href = 'tel:01500899243';
  }

  // ── Helpers ────────────────────────────────────────────────────
  getTagClass(tag: MenuTag): string {
    return { beef: 'tag-beef', chicken: 'tag-chicken', veg: 'tag-veg', fish: 'tag-fish' }[tag] ?? '';
  }
}
