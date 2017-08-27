import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './error404/error404.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './simulation/';
import { EditorComponent } from './simulation';
import { MonitorComponent } from './simulation';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'editor',
    component: EditorComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'monitor',
    component: MonitorComponent
  },
  {
    path: '',
    component: DashboardComponent
  },
  {
    path: '**',
    component: Error404Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
