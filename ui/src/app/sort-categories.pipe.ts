import { Pipe, PipeTransform } from '@angular/core';
import { Category, Keyword2 } from './text/Keyword';


@Pipe({
  name: 'sortCategories',
  pure: false
})
export class SortCategoriesPipe implements PipeTransform {

  transform(value: any): any {
    return JSON.parse(JSON.stringify(value)).sort((a,b) => {
      if (a.active == true){
        return -1;
      } else if (b.active == true){
        return 1;
      }
      else return 0
    });
  }
}
