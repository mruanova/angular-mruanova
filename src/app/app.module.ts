//modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//services
import { ApiService } from './api.service';
import { ProductService } from './product.service';
//components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { AboutComponent } from './about/about.component';
import { DemoComponent } from './demo/demo.component';
import { GamesComponent } from './games/games.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductNewComponent,
    ProductListComponent,
    ProductEditComponent,
    ProjectListComponent,
    AboutComponent,
    DemoComponent,
    GamesComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiService, ProductService],
  bootstrap: [AppComponent]
})

export class AppModule { };
