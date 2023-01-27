import { Component, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {

  menuItems = [
    {
      icon: 'list',
      name: 'Forms'
    },
    {
      icon: 'people',
      name: 'Customers'
    },
    {
      icon: 'graphic_eq',
      name: 'Submissions'
    },
    {
      icon: 'history',
      name: 'History'
    },
    {
      icon: 'poll',
      name: 'Reports'
    },
    {
      icon: 'poll',
      name: 'Workflow'
    },
  ]

  activeRoute!: string;


  constructor(private readonly router: Router) {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(route => {
      this.activeRoute = route.url
    })
  }

}
