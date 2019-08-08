import { Component, EventEmitter, ChangeDetectionStrategy, Output, Input, OnChanges, SimpleChange } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ZIP_PREFIX, COUNTRIES } from "../../app.config";
import { Address } from '../../models/address.model';

@Component({
    selector: "address-form",
    styleUrls: ["./address-form.container.scss"],
    templateUrl: "./address-form.container.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddressFormContainer implements OnChanges {
  addressForm: FormGroup;
  countries = COUNTRIES;

  @Input() address?: Address;
  @Input() addressCount: number;

  @Output() submitAddress = new EventEmitter<Address>();
  @Output() cancelEdit = new EventEmitter<void>();

  constructor(formBuilder: FormBuilder) {
    this.addressForm = formBuilder.group({
      name: formBuilder.control("", Validators.required),
      zip: formBuilder.control("", [
        Validators.required,
        Validators.maxLength(5),
        Validators.pattern(ZIP_PREFIX)]
      ),
      street: formBuilder.control("", Validators.required),
      country: formBuilder.control("", Validators.required)
    });
  }

  ngOnChanges(changes: { address?: SimpleChange }) {
    if (!!changes.address) {
      this.addressForm.reset();

      if (!!changes.address.currentValue) {
        this.addressForm.patchValue({
          name: this.address.name,
          zip: this.address.addressDetails.zip,
          street: this.address.addressDetails.street,
          country: this.address.addressDetails.country
        });
      }
    }
	}

  onSubmit() {
    const address: Address = {
      id: this.address && this.address.id || this.addressCount + 1,
      name: this.addressForm.controls.name.value,
      addressDetails: {
        zip: this.addressForm.controls.zip.value,
        street: this.addressForm.controls.street.value,
        country: this.addressForm.controls.country.value
      }
    };

    this.submitAddress.emit(address);
    this.addressForm.reset();
  }
}
