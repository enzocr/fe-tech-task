import {inject, Injectable, signal} from '@angular/core';
import {BaseService} from './base-service';
import {ICategory, IResponse, ISearch} from '../interfaces';
import {AuthService} from './auth.service';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<ICategory> {
  protected override source: string = 'api/categories';
  private categoriesSignal = signal<ICategory[]>([]);

  get categories$() {
    return this.categoriesSignal;
  }

  public search: ISearch = {
    page: 1,
    size: 5
  }
  public totalItems: any = [];
  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);

  getAll() {
    this.findAll().subscribe({
      next: (response: IResponse<ICategory[]>) => {
        this.categoriesSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('Error fetching all categories', err);
      }
    });
  }

  getAllPaginated() {
    this.paginated(this.search).subscribe({
      next: (response: IResponse<ICategory[]>) => {
        this.search = {...this.search, ...response.meta};
        this.totalItems = Array.from({length: this.search.totalPages ? this.search.totalPages : 0}, (_, i) => i + 1);
        this.categoriesSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(item: ICategory) {
    this.add(item).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAllPaginated();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the category', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(item: ICategory) {
    this.editCustomSource(`${item.id}`, item).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAllPaginated();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the category', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: ICategory) {
    this.del(item.id).subscribe({
      next: () => {
        this.alertService.displayAlert('success', 'Category deleted successfully', 'center', 'top', ['success-snackbar']);
        this.getAllPaginated();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the category', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

}
