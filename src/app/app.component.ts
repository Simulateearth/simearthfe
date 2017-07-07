import { Component } from '@angular/core';

@Component({
  selector: 'sme-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  state = {
    population: 1,
    birthRate: 1
  }
  effects = [
    {
      title: 'birth',
      change: 'population = population + birthRate'
    }
  ]
}
