import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { MvService, Profile } from './mv.service';

@Component({
  selector: 'app-mv',
  templateUrl: './mv.component.html',
  styleUrls: ['./mv.component.scss'],
})
export class MvComponent implements OnInit, AfterViewInit {
  searchControl = new FormControl('');
  profiles: Profile[] = [];
  isLoading = false;
  page = 0;
  totalPages = 1;

  @ViewChild('infiniteScroll', { static: false }) infiniteScroll!: ElementRef;

  constructor(private mvService: MvService) {}

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        distinctUntilChanged(), // Impede requisições se o valor for o mesmo
        debounceTime(300),
        switchMap((value) => this.fetchProfiles(value, true)) // Reset when text changes
      )
      .subscribe();
  }

  ngAfterViewInit() {
    this.setupScrollObserver();
  }

  fetchProfiles(query: string = '', reset: boolean = false) {
    if (reset) this.page = 0;
    this.isLoading = true;

    return this.mvService.searchProfiles(query, this.page).pipe(
      switchMap((data) => {
        this.profiles = reset ? data.profiles : [...this.profiles, ...data.profiles];
        this.totalPages = reset ? data.totalPages : 1
        this.isLoading = false;
        return [];
      })
    );
  }

  loadMore() {
    if (this.page >= this.totalPages - 1) return; // Impede request se já estamos na última página
    this.page++;
    this.fetchProfiles(this.searchControl.value).subscribe();
  }

  setupScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.loadMore();
      }
    });

    observer.observe(this.infiniteScroll.nativeElement);
  }

  displayWith(item: Profile) {
    return item?.profileName;
  }
}
