import { Component, OnInit } from '@angular/core';
import { routes } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  routes: string[] = [];

  constructor() {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes() {
    routes.forEach((route) => route.path && this.routes.push(route.path));
  }
}
