import {Component, inject, ViewChild} from '@angular/core';
import {UserListComponent} from '../../components/user/user-list/user-list.component';
import {UserFormComponent} from '../../components/user/user-from/user-form.component';
import {LoaderComponent} from '../../components/loader/loader.component';
import {ModalComponent} from '../../components/modal/modal.component';
import {PaginationComponent} from '../../components/pagination/pagination.component';
import {ModalService} from '../../services/modal.service';
import {FormBuilder, Validators} from '@angular/forms';
import {IRequestUser, IUser} from '../../interfaces';
import {UserService} from '../../services/user.service';
import {ProductListComponent} from '../../components/product/product-list/product-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserListComponent,
    PaginationComponent,
    ModalComponent,
    LoaderComponent,
    UserFormComponent,
    ProductListComponent
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  public userService: UserService = inject(UserService);
  public modalService: ModalService = inject(ModalService);
  @ViewChild('addUsersModal') public addUsersModal: any;
  public fb: FormBuilder = inject(FormBuilder);

  userForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor() {
    this.userService.search.page = 1;
    this.userService.getAllPaginated();
  }

  saveUser(user: IRequestUser) {
    this.userService.save(user);
    this.modalService.closeAll();
  }

  callEdition(user: IUser) {
    this.userForm.reset();
    this.userForm.controls['id'].setValue(user.id ? JSON.stringify(user.id) : '');
    this.userForm.controls['name'].setValue(user.name || '');
    this.userForm.controls['email'].setValue(user.email ? user.email : '');
    this.userForm.controls['email'].disable();
    this.userForm.controls['password'].setValue(user.password ? user.password : '');
    this.userForm.controls['password'].disable();
    this.modalService.displayModalForm('md', this.addUsersModal, this.userForm);
  }

  updateUser(user: IRequestUser) {
    this.userService.update(user);
    this.modalService.closeAll();
  }

}
