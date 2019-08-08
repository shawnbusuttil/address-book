import { TestBed, async } from '@angular/core/testing';

import { AddressBookService } from './address-book.service';

const MOCK_ADDRESS = {
  id: 66,
  name: "TestAddress",
  addressDetails: {
    zip: "ABC",
    street: "Sesame Street",
    country: "The Underworld"
  }
};

describe('AddressBookServiceSpecs', () => {
  let service: AddressBookService;
  let index;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ providers: [AddressBookService] });
    service = TestBed.get(AddressBookService);

    index = service.addAddress(MOCK_ADDRESS);
  }));

  describe("given an address is added", () => {
    it("should add the address", done => {
      service.addressBook$.subscribe(book => {
        expect(book[index]).toEqual(MOCK_ADDRESS);
        done();
      });
    });
  });

  describe("given an address exists and is updated", () => {
    it("should update the address", done => {
      const MOCK_ADDRESS_2 = { ...MOCK_ADDRESS, name: "TestAddress2" };
      index = service.updateAddress(MOCK_ADDRESS_2);

      service.addressBook$.subscribe(book => {
        expect(book[index]).toEqual(MOCK_ADDRESS_2);
        done();
      });
    });
  });
});
