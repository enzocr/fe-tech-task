import {Injectable} from '@angular/core';
import {
  BehaviorSubject,
  Subject
} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private unsubscribe: Subject<any> = new Subject();
  private pageTitle = new BehaviorSubject<string>('');

  public title = this.pageTitle.asObservable();
  public sidebarOpen: boolean = true;

  constructor() {
  }

  public toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
