import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DashComponent } from './dash/dash.component';
import { RoutesModule } from './routes.module';
import { GroupComponent } from './group/group.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { GroupModalComponent } from './group-modal/group-modal.component';
import { BasicmodalComponent } from './basicmodal/basicmodal.component';
import { InputComponent } from './input/input.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from 'src/services/question.service';
import { SubGroupComponent } from './sub-group/sub-group.component';
import { SubGroupModalComponent } from './sub-group-modal/sub-group-modal.component';
import { ProductComponent } from './product/product.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { UserModalComponent } from './user-modal/user-modal.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { CollectionComponent } from './collection/collection.component';
import { CollectionModalComponent } from './collection-modal/collection-modal.component';
import { ClientComponent } from './client/client.component';
import { ClientModalComponent } from './client-modal/client-modal.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditSubGroupComponent } from './edit-sub-group/edit-sub-group.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { ClientAdressComponent } from './client-adress/client-adress.component';
import { EditAdressComponent } from './edit-adress/edit-adress.component';
import { OrderComponent } from './order/order.component';
import { OrderModalComponent } from './order-modal/order-modal.component';
import { ChangeCompletedComponent } from './change-completed/change-completed.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';
import { CadproductComponent } from './cadproduct/cadproduct.component';
import { DateComponent } from './date/date.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    DashComponent,
    GroupComponent,
    UserComponent,
    GroupModalComponent,
    BasicmodalComponent,
    InputComponent,
    QuestionComponent,
    SubGroupComponent,
    SubGroupModalComponent,
    ProductComponent,
    ProductModalComponent,
    UserModalComponent,
    DropdownComponent,
    CollectionComponent,
    CollectionModalComponent,
    ClientComponent,
    ClientModalComponent,
    EditGroupComponent,
    EditSubGroupComponent,
    EditProductComponent,
    EditUserComponent,
    EditCollectionComponent,
    ClientAdressComponent,
    EditAdressComponent,
    OrderComponent,
    OrderModalComponent,
    ChangeCompletedComponent,
    ErrorModalComponent,
    CadproductComponent,
    DateComponent,
  ],
  imports: [
    RoutesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports : [
    RouterModule
  ],
  providers: [
    QuestionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
