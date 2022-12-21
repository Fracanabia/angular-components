import { Component, OnInit } from '@angular/core';
import { routes } from 'src/app/app-routing.module';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  public routes: string[] = [];

  public search = '';

  constructor() {}

  ngOnInit(): void {
    this.getRoutes();
  }

  getRoutes() {
    routes.filter(route => !!route.path).forEach((route) => route.path && this.routes.push(route.path));
  }
}
