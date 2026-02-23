import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'play',
    loadComponent: () => import('./pages/play/play.component').then((m) => m.PlayComponent),
  },
  {
    path: 'learn',
    loadComponent: () => import('./pages/learn/learn.component').then((m) => m.LearnComponent),
  },
  {
    path: 'learn/:id',
    loadComponent: () => import('./pages/lesson/lesson.component').then((m) => m.LessonComponent),
  },
  {
    path: 'puzzles',
    loadComponent: () => import('./pages/puzzles/puzzles.component').then((m) => m.PuzzlesComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
