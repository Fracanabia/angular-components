import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  routes: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes() {
    routes.filter(route => !!route.path).sort((a,b) => a.path! > b.path! ? -1 : b.path! > a.path! ? 1 : 0).forEach((route) => route.path && this.routes.push(route.path));
  }
}
