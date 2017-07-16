import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Error404Component } from './error404/error404.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './simulation/';
import { EditorComponent } from './simulation';

const routes: Routes = [
  {
    path: 'simulation',
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
