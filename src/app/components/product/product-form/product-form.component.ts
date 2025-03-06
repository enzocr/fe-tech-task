import {CommonModule} from '@angular/common';
import {Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ICategory, IProduct} from '../../../interfaces';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnChanges{
  public fb: FormBuilder = inject(FormBuilder);
  @Input() categoryList!: ICategory[];
  @Input() productForm!: FormGroup;
  @Output() callSaveMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callUpdateMethod: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  callSave() {
    let item: IProduct = {
      name: this.productForm.controls['name'].value,
      description: this.productForm.controls['description'].value,
      price: this.productForm.controls['price'].value,
      stockQuantity: this.productForm.controls['stockQuantity'].value,
      id: this.productForm.controls['id'].value || undefined,
      category:  this.productForm.controls['category'].value || undefined
    };

    if (this.productForm.controls['id'].value) {
      item.id = this.productForm.controls['id'].value;
    }
    if (item.id) {
      this.callUpdateMethod.emit(item);
    } else {
      this.callSaveMethod.emit(item);
    }
    this.productForm.reset();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['productForm']) {
      console.log(changes['productForm'].currentValue.controls['category'].value);
    }
  }

}
