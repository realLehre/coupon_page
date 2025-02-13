import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CategoryService } from './category.service';
import { RadioButton } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../../core/filter.service';

@Component({
  selector: 'app-category',
  imports: [RadioButton, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryComponent {
  private categoryService = inject(CategoryService);
  private filterService = inject(FilterService);
  categories = this.categoryService.categories;
  selectedCategory = this.filterService.currentCategory;

  onSelectCategory(category: any) {
    this.filterService.currentCategory.set(
      this.filterService.currentCategory() === category ? null : category,
    );
    this.filterService.currentPage.set(1);
    this.filterService.setDataAndRoute();
  }
}
