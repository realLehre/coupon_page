import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemsShowing',
})
export class ItemsShowingPipe implements PipeTransform {
  transform(page: number, total?: number): number {
    if (total) {
      return Math.min(page * 16, total);
    } else {
      return (page - 1) * 16 + 1;
    }
  }
}
