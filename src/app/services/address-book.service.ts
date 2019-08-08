import { Injectable } from '@angular/core';

import { Address } from '../models/address.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class AddressBookService {
  private readonly _addressBook = new BehaviorSubject<Address[]>([]);
  readonly addressBook$ = this._addressBook.asObservable();

  private get addressBook(): Address[] {
    return this._addressBook.getValue();
  }

  private set addressBook(val: Address[]) {
    this._addressBook.next(val);
  }

  addAddress(address: Address): number {
    this.addressBook = [...this.addressBook, address];
    return this.addressBook.indexOf(address);
  }

  updateAddress(address: Address): number {
    const index = this.addressBook.findIndex(item => item.id === address.id);

    const start = this.addressBook.slice(0, index);
    const end = this.addressBook.slice(index + 1, this.addressBook.length);

    this.addressBook = [...start, address, ...end];
    return index;
  }

}
