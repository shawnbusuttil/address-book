import { ChangeDetectionStrategy, Component } from "@angular/core";

import { Address } from '../../models/address.model';
import { AddressBookService } from '../../services/address-book.service';

@Component({
    selector: "address-book",
    styleUrls: ["./address-book.container.scss"],
    templateUrl: "./address-book.container.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressBookContainer {
  currentAddress: Address | undefined;

  constructor(public service: AddressBookService) {}

  submitAddress(address: Address) {
    if (!!this.currentAddress) {
      this.service.updateAddress(address);
    } else {
      this.service.addAddress(address);
    }

    this.currentAddress = undefined;
  }

  cancelEdit() {
    this.currentAddress = undefined;
  }

  editAddress(address: Address) {
    this.currentAddress = address;
  }
}
