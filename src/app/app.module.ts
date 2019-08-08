import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms';

import { AddressBookContainer } from './components/address-book/address-book.container';
import { AddressFormContainer } from './components/address-form/address-form.container';
import { AddressListComponent } from './components/address-list/address-list.component';

import { AddressBookService } from './services/address-book.service';

@NgModule({
  declarations: [
    AddressBookContainer,
    AddressFormContainer,
    AddressListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [
    AddressBookService
  ],
  bootstrap: [AddressBookContainer]
})
export class AppModule { }
