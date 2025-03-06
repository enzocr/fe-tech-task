import {Component, EventEmitter, Input, Output, inject} from '@angular/core';
import {IUser} from '../../../interfaces';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  public fb: FormBuilder = inject(FormBuilder);
  @Input() userForm!: FormGroup;
  @Input() title='User';
  @Output() callSaveMethod: EventEmitter<IUser> = new EventEmitter<IUser>();
  @Output() callUpdateMethod: EventEmitter<IUser> = new EventEmitter<IUser>();

  callSave() {
    let item: IUser = {
      name: this.userForm.controls['name'].value,
      email: this.userForm.controls['email'].value,
      password: this.userForm.controls['password'].value
    }
    if (this.userForm.controls['id'].value) {
      item.id = this.userForm.controls['id'].value;
    }
    if (item.id) {
      this.callUpdateMethod.emit(item);
    } else {
      this.callSaveMethod.emit(item);
    }
    this.userForm.reset();
  }
}
