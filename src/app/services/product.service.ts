import {inject, Injectable, signal} from '@angular/core';
import {BaseService} from './base-service';
import {IProduct, IRequestProduct, IResponse, ISearch} from '../interfaces';
import {AuthService} from './auth.service';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct> {
  protected override source: string = 'api/products';
  private productsSignal = signal<IProduct[]>([]);

  get products$() {
    return this.productsSignal;
  }

  public search: ISearch = {
    page: 0,
    size: 5
  }
  public totalItems: any = [];
  private authService: AuthService = inject(AuthService);
  private alertService: AlertService = inject(AlertService);


  getAll() {
    this.findAll().subscribe({
      next: (response: IResponse<IProduct[]>) => {
        this.productsSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('Error fetching all categories', err);
      }
    });
  }

  getAllPaginated() {
    this.paginated(this.search).subscribe({
      next: (response: IResponse<IProduct[]>) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
        this.productsSignal.set(response.data);
      },
      error: (err: any) => {
        console.error('error', err);
      }
    });
  }

  save(item: IProduct) {

    const productRequest: IRequestProduct = {
      name: item.name,
      description: item.description,
      price: item.price,
      stockQuantity: item.stockQuantity,
      categoryId: item.category?.id
    };

    this.add(productRequest).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAllPaginated();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred adding the product', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  update(item: IProduct) {

    const productRequest: IRequestProduct = {
      name: item.name,
      description: item.description,
      price: item.price,
      stockQuantity: item.stockQuantity,
      categoryId: item.category ? item.category.id : undefined
    };

    this.editCustomSource(`${item.id}`, productRequest).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred updating the product', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

  delete(item: IProduct) {
    this.del(item.id).subscribe({
      next: () => {

        this.alertService.displayAlert('success', 'Product deleted successfully', 'center', 'top', ['success-snackbar']);
        this.getAllPaginated();
      },
      error: (err: any) => {
        this.alertService.displayAlert('error', 'An error occurred deleting the product', 'center', 'top', ['error-snackbar']);
        console.error('error', err);
      }
    });
  }

}
