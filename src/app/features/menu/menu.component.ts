import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  signal,
  computed,
  ViewChildren,
  QueryList,
  ElementRef,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItem, MenuCategory, MenuTag } from '../../core/models/menu.model';
import { MENU_ITEMS, MENU_CATEGORIES } from '../../core/data/menu.data';

type SortMode = 'default' | 'asc' | 'desc';
type FilterTag = MenuTag | 'all';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChildren('sectionRef') sectionRefs!: QueryList<ElementRef<HTMLElement>>;

  readonly categories = MENU_CATEGORIES;

  // Reactive state
  activeCategory = signal<MenuCategory>('breakfast');
  activeFilter   = signal<FilterTag>('all');
  sortMode       = signal<SortMode>('default');
  selectedItem   = signal<MenuItem | null>(null);
  showModal      = signal(false);
  isClosingModal = signal(false);
  searchQuery    = signal('');

  readonly filterOptions: { key: FilterTag; label: string; emoji: string }[] = [
    { key: 'all',     label: 'All',     emoji: '🌟' },
    { key: 'beef',    label: 'Beef',    emoji: '🥩' },
    { key: 'chicken', label: 'Chicken', emoji: '🍗' },
    { key: 'veg',     label: 'Veg',     emoji: '🥬' },
    { key: 'fish',    label: 'Fish',    emoji: '🐟' },
  ];

  readonly displayedItems = computed(() => {
    let items = MENU_ITEMS.filter(i => i.category === this.activeCategory());

    const filter = this.activeFilter();
    if (filter !== 'all') {
      items = items.filter(i => i.tags?.includes(filter));
    }

    const q = this.searchQuery().trim().toLowerCase();
    if (q) {
      items = items.filter(
        i => i.name.toLowerCase().includes(q) || i.description.toLowerCase().includes(q)
      );
    }

    const mode = this.sortMode();
    if (mode === 'asc')  items = [...items].sort((a, b) => a.price - b.price);
    if (mode === 'desc') items = [...items].sort((a, b) => b.price - a.price);

    return items;
  });

  readonly categoryCount = computed(() => {
    return this.categories.map(c => ({
      ...c,
      count: MENU_ITEMS.filter(i => i.category === c.id).length,
    }));
  });

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupScrollObserver();
    }
  }

  private setupScrollObserver(): void {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  setCategory(cat: MenuCategory): void {
    this.activeCategory.set(cat);
    this.activeFilter.set('all');
    this.searchQuery.set('');
    // Scroll to top of items section
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        document.getElementById('menu-items')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        this.setupScrollObserver();
      }, 100);
    }
  }

  setFilter(f: FilterTag): void {
    this.activeFilter.set(f);
  }

  toggleSort(): void {
    const cycle: SortMode[] = ['default', 'asc', 'desc'];
    const idx = cycle.indexOf(this.sortMode());
    this.sortMode.set(cycle[(idx + 1) % cycle.length]);
  }

  getSortLabel(): string {
    const m = this.sortMode();
    if (m === 'asc')  return '↑ Price';
    if (m === 'desc') return '↓ Price';
    return '⇅ Sort';
  }

  openItem(item: MenuItem): void {
    this.selectedItem.set(item);
    this.showModal.set(true);
    this.isClosingModal.set(false);
    if (isPlatformBrowser(this.platformId)) {
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal(): void {
    this.isClosingModal.set(true);
    setTimeout(() => {
      this.showModal.set(false);
      this.isClosingModal.set(false);
      this.selectedItem.set(null);
      if (isPlatformBrowser(this.platformId)) {
        document.body.style.overflow = '';
      }
    }, 280);
  }

  callOrder(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = 'tel:01500899243';
    }
  }

  getTagClass(tag: MenuTag): string {
    const map: Record<MenuTag, string> = {
      beef:    'tag-beef',
      chicken: 'tag-chicken',
      veg:     'tag-veg',
      fish:    'tag-fish',
    };
    return map[tag] ?? '';
  }

  getTagEmoji(tag: MenuTag): string {
    const map: Record<MenuTag, string> = {
      beef: '🥩', chicken: '🍗', veg: '🥬', fish: '🐟',
    };
    return map[tag] ?? '';
  }

  trackById(_i: number, item: MenuItem): string {
    return item.id;
  }
}
