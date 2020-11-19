import { CategoryService } from './../../shared/services/category.service';
import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category } from 'src/app/shared/models/category';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent {
  categories$;
  @Input('category') category; 

  constructor(categoryServise: CategoryService,) { 
    this.categories$ = categoryServise.getAllCategories().pipe(map(data => data.map(item => item.payload.doc.data() as Category)));
  }

}
