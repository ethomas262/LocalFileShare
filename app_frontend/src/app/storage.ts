import { InjectionToken } from '@angular/core';

export const STORAGE = new InjectionToken<Storage>('Storage', {
  providedIn: 'root',
  factory: () => localStorage,
});