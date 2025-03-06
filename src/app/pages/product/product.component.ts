import {Component, inject, ViewChild} from '@angular/core';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {ModalComponent} from '../../components/modal/modal.component';
import {LoaderComponent} from '../../components/loader/loader.component';
import {IProduct} from '../../interfaces';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ModalService} from '../../services/modal.service';
import {ProductFormComponent} from '../../components/product/product-form/product-form.component';
import {ProductListComponent} from '../../components/product/product-list/product-list.component';
import {ProductService} from '../../services/product.service';
import {CategoryService} from '../../services/category.service';
import {CategoryListComponent} from '../../components/category/category-list/category-list.component';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductListComponent,
    ProductFormComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    CategoryListComponent,
    NgIf
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  public productService: ProductService = inject(ProductService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  public categoryService: CategoryService = inject(CategoryService);
  @ViewChild('addProductModal') public addProductModal: any;
  public fb: FormBuilder = inject(FormBuilder);

  productForm: FormGroup = this.fb.group({
    id: [null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [null, [Validators.required]],
    stockQuantity: [null, [Validators.required]],
    category: [null, [Validators.required]],
  });

  constructor() {
    this.productService.search.page = 1;
    this.categoryService.getAll();
    this.productService.getAllPaginated();
  }


  save(item: IProduct) {
    item.category = this.categoryService.categories$().find(itemCategory => itemCategory.id == item.category);
    this.productService.save(item);
    this.modalService.closeAll();
  }

  callEdition(item: IProduct) {
    this.productForm.reset();
    this.productForm.controls['id'].setValue(item.id !== undefined ? item.id : null);
    this.productForm.controls['name'].setValue(item.name || '');
    this.productForm.controls['description'].setValue(item.description || '');
    this.productForm.controls['price'].setValue(item.price !== undefined ? item.price : null);
    this.productForm.controls['stockQuantity'].setValue(item.stockQuantity !== undefined ? item.stockQuantity : null);
    this.productForm.controls['category'].setValue(item.category?.id !== undefined ? item.category?.id : null);

    // Display the modal
    this.modalService.displayModalForm('md', this.addProductModal,this.productForm);
  }

  update(item: IProduct) {
    item.category = this.categoryService.categories$().find(itemCategory => itemCategory.id == item.category);
    this.productService.update(item);
    this.modalService.closeAll();
  }
}
