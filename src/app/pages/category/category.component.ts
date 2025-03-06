import {Component, inject, ViewChild} from '@angular/core';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {ModalComponent} from '../../components/modal/modal.component';
import {LoaderComponent} from '../../components/loader/loader.component';
import {ICategory} from '../../interfaces';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CategoryService} from '../../services/category.service';
import {CategoryListComponent} from '../../components/category/category-list/category-list.component';
import {CategoryFormComponent} from '../../components/category/category-form/category-form.component';
import {ModalService} from '../../services/modal.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CategoryListComponent,
    CategoryFormComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    NgIf
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  public categoryService: CategoryService = inject(CategoryService);
  public modalService: ModalService = inject(ModalService);
  public authService: AuthService = inject(AuthService);
  @ViewChild('addCategoryModal') public addCategoryModal: any;
  public fb: FormBuilder = inject(FormBuilder);

  categoryForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    description: ['', Validators.required],
  })

  constructor() {
    this.categoryService.search.page = 1;
    //TODO: fix if else
    this.authService.isSuperAdmin() ? this.categoryService.getAllPaginated() : this.categoryService.getAllPaginated();
  }

  save(item: ICategory) {
    this.categoryService.save(item);
    this.modalService.closeAll();
  }

  callEdition(item: ICategory) {
    this.categoryForm.controls['id'].setValue(item.id ? JSON.stringify(item.id) : '');
    this.categoryForm.controls['name'].setValue(item.name ? item.name : '');
    this.categoryForm.controls['description'].setValue(item.description ? item.description : '');
    this.modalService.displayModalForm('md', this.addCategoryModal, this.categoryForm);
  }

  update(item: ICategory) {
    this.categoryService.update(item);
    this.modalService.closeAll();
  }

}
