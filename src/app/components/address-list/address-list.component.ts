import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from "@angular/core";

import { Address } from '../../models/address.model';

@Component({
    selector: "address-list",
    styleUrls: ["./address-list.component.scss"],
    templateUrl: "./address-list.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressListComponent {
  @Input() addresses: Address[];
  @Output() editAddress = new EventEmitter<Address>();
}
