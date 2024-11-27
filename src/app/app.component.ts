import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InfiniteScroll } from '../infinite-scroll/infinite-scroll.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InfiniteScroll],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular-vite-app';
} 
