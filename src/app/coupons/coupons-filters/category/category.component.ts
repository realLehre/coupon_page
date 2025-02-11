import { Component, inject } from '@angular/core';
import { CategoryService } from './category.service';
import { KeyValuePipe } from '@angular/common';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  imports: [KeyValuePipe, RadioButton, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  private categoryService = inject(CategoryService);
  categories = this.categoryService.categories;
  selectedCategory = null;

  ngOnInit() {
    console.log(this.categories());
  }

  onSelectCategory(category: any) {
    this.selectedCategory = category;
  }
}
