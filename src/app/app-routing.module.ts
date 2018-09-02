import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductListComponent } from './product-list/product-list.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'products', component: ProductListComponent, pathMatch: 'full' },
  { path: 'products/new', component: ProductNewComponent, pathMatch: 'full' },
  { path: 'products/edit/:id', component: ProductEditComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent, pathMatch: 'prefix' },
];

export const AppRoutingModule = RouterModule.forRoot(APP_ROUTES);
