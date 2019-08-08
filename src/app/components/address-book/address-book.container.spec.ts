import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, async, TestBed } from "@angular/core/testing";

import { AddressBookContainer } from './address-book.container';
import { AddressBookService } from '../../services/address-book.service';

class MockAddressBookService {
  private addressBook = [];

  addAddress = (address) => {
    this.addressBook = [...this.addressBook, address];
    return this.addressBook.indexOf(address);
  }

  updateAddress = (address) => {
    const index = this.addressBook.findIndex(item => item.id === address.id);

    const start = this.addressBook.slice(0, index);
    const end = this.addressBook.slice(index + 1, this.addressBook.length);

    this.addressBook = [...start, address, ...end];
    return index;
  }
}

const MOCK_ADDRESS = {
  id: 66,
  name: "TestAddress",
  addressDetails: {
    zip: "ABC",
    street: "Sesame Street",
    country: "The Underworld"
  }
};

describe("AddressBookSpecs", () => {
  let fixture: ComponentFixture<AddressBookContainer>;
  let component: AddressBookContainer;
  let service: MockAddressBookService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddressBookContainer],
      providers: [
        { provide: AddressBookService, useClass: MockAddressBookService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressBookContainer);
    service = TestBed.get(AddressBookService);

    component = fixture.componentInstance;
  });

  describe("given the container is initialized", () => {
    it("should have no current address", () => {
      expect(component.currentAddress).toBeUndefined();
    });

    describe("when an address is edited", () => {
      beforeEach(() => {
        component.editAddress(MOCK_ADDRESS);
      });

      it("should set the current address to that address", () => {
        component.currentAddress = MOCK_ADDRESS;
      });
    });

    describe("when an address is submitted", () => {
      let addSpy: jasmine.Spy;
      let updateSpy: jasmine.Spy;

      beforeEach(() => {
        addSpy = spyOn(service, "addAddress");
        updateSpy = spyOn(service, "updateAddress");
      });

      describe("and there is no current address", () => {
        beforeEach(() => {
          component.submitAddress(MOCK_ADDRESS);
        });

        it("should call the address book to add the address", () => {
          expect(addSpy).toHaveBeenCalledWith(MOCK_ADDRESS);
        });
      });

      describe("and there is a current address", () => {
        beforeEach(() => {
          component.currentAddress = MOCK_ADDRESS;
          component.submitAddress(MOCK_ADDRESS);
        });

        it("should call the address book to update the address", () => {
          expect(updateSpy).toHaveBeenCalledWith(MOCK_ADDRESS);
        });
      });
    });
  });
});
