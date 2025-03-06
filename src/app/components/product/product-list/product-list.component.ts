import {Component, Input, Output, EventEmitter} from '@angular/core';
import {IProduct} from '../../../interfaces';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() title: string = '';
  @Input() products: IProduct[] = [];
  @Output() callModalAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Output() callDeleteAction: EventEmitter<IProduct> = new EventEmitter<IProduct>();
  @Input() isSuperAdmin!: boolean;
}
