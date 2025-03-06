import {CommonModule} from '@angular/common';
import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {ICategory} from '../../../interfaces';

@Component({
    selector: 'app-category-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule
    ],
    templateUrl: './category-form.component.html',
    styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
    public fb: FormBuilder = inject(FormBuilder);
    @Input() categoryForm!: FormGroup;
    @Output() callSaveMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();
    @Output() callUpdateMethod: EventEmitter<ICategory> = new EventEmitter<ICategory>();

    callSave() {
        let item: ICategory = {
            name: this.categoryForm.controls['name'].value,
            description: this.categoryForm.controls['description'].value,
        }
        if (this.categoryForm.controls['id'].value) {
            item.id = this.categoryForm.controls['id'].value;
        }
        if (item.id) {
            this.callUpdateMethod.emit(item);
        } else {
            this.callSaveMethod.emit(item);
        }
        this.categoryForm.reset();
    }
}
