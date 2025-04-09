import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { FormField } from '../../components/custom-form/custom-form.component';
import { schemaBase } from './../../components/custom-form/utils/base';
import { Module, MvService, Profile } from './mv.service';

@Component({
  selector: 'app-mv',
  templateUrl: './mv.component.html',
  styleUrls: ['./mv.component.scss'],
})
export class MvComponent implements OnInit, AfterViewInit {
  profileSearchControl = new FormControl('');
  moduleSearchControl = new FormControl('');
  schemaBase = schemaBase;
  profiles: Profile[] = [];
  profile: Profile | null = null;
  modules: Module[] = [];
  modulesFiltered: Module[] = [];
  module: Module | null = null;
  isLoading = false;
  page = 0;
  totalPages = 1;
  @ViewChild('infiniteScroll', { static: false }) infiniteScroll!: ElementRef;
  schema: FormField | null = null;
  show = true;

  constructor(private mvService: MvService) {}

  ngOnInit() {
    this.profileSearchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        filter((value) => typeof value === 'string'),
        switchMap((value) => this.fetchProfiles(value, true))
      )
      .subscribe();
    this.moduleSearchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(300),
        filter((value) => typeof value === 'string')
      )
      .subscribe((value) => {
        this.modulesFiltered = this.modules.filter((module) =>
          module.moduleName.toLowerCase().includes(value.toLowerCase())
        );
      });
  }

  ngAfterViewInit() {
    this.setupScrollObserver();
  }

  handleSelectProfile(event: MatAutocompleteSelectedEvent) {
    this.profile = event.option.value as Profile;
    this.modules = (event.option.value as Profile).modules;
  }

  handleSelectModule(event: MatAutocompleteSelectedEvent) {
    this.module = event.option.value as Module;
  }

  fetchProfiles(query: string = '', reset: boolean = false) {
    if (reset) this.page = 0;
    this.isLoading = true;

    return this.mvService.searchProfiles(query, this.page).pipe(
      switchMap((data) => {
        this.profiles = reset
          ? data.profiles
          : [...this.profiles, ...data.profiles];
        this.modules = [];
        this.module = null;
        this.profile = null;
        this.totalPages = reset ? data.totalPages : 1;
        this.isLoading = false;
        return [];
      })
    );
  }

  loadMore() {
    if (this.page >= this.totalPages - 1) return; // Impede request se já estamos na última página
    this.page++;
    this.fetchProfiles(this.profileSearchControl.value).subscribe();
  }

  setupScrollObserver() {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.loadMore();
      }
    });

    observer.observe(this.infiniteScroll.nativeElement);
  }

  displayProfile(item: Profile) {
    return item?.profileName;
  }

  displayModule(item: Module) {
    return item?.moduleName;
  }

  formValue(schema: FormField) {
    this.schema = schema;
  }

  resetSchema() {
    this.show = false;
    setTimeout(() => {
      this.show = true;
    });
  }

  createSchemaByModule() {
    if (this.module && this.profile && this.schema) {
      this.mvService
        .createSchemaByModule({
          module: this.module.moduleName,
          profileModuleId: this.module.id,
          schema: JSON.stringify(this.schema),
          schemaProvider: '',
        })
        .subscribe();
    }
  }
}
