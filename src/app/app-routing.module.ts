import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DemoComponent } from './demo/demo.component';
import { GamesComponent } from './games/games.component';

const APP_ROUTES: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'demo', component: DemoComponent, pathMatch: 'full' },
  { path: 'games', component: GamesComponent, pathMatch: 'full' },
  { path: 'products', component: ProductListComponent, pathMatch: 'full' },
  { path: 'products/new', component: ProductNewComponent, pathMatch: 'full' },
  { path: 'products/edit/:id', component: ProductEditComponent, pathMatch: 'full' },
  { path: '**', component: HomeComponent, pathMatch: 'prefix' },
];

export const AppRoutingModule = RouterModule.forRoot(APP_ROUTES);
