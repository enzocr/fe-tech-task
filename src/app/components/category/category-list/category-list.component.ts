import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ICategory} from '../../../interfaces';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() title: string = '';
  @Input() categories: ICategory[] = [];

  @Output() callModalAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Output() callDeleteAction: EventEmitter<ICategory> = new EventEmitter<ICategory>();
  @Input() isSuperAdmin!: boolean;
}
