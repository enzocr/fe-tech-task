import {inject, Injectable, signal} from '@angular/core';
import {BaseService} from './base-service';
import {IRequestUpdateUser, IRequestUser, ISearch, IUser} from '../interfaces';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService<IUser> {
  protected override source: string = 'api/users';
  private userListSignal = signal<IUser[]>([]);

  get users$() {
    return this.userListSignal;
  }

  public search: ISearch = {
    page: 1,
    size: 5
  }
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

  getAllPaginated() {
    this.paginated({page: this.search.page, size: this.search.size}).subscribe({
      next: (response: any) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages : 0}, (_, i) => i + 1);
        this.userListSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(user: IRequestUser) {
    this.addCustomSource('register', user).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAllPaginated();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred while adding the user', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(user: IRequestUpdateUser) {
    this.editCustomSource('', user).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAllPaginated();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the user', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(user: IUser) {
    this.delCustomSource(`${user.email}`).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAllPaginated();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the user', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }
}
