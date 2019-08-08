import { NO_ERRORS_SCHEMA, Component, ViewChild } from '@angular/core';
import { ComponentFixture, async, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { AddressFormContainer } from './address-form.container';

const MOCK_ADDRESS_FORM_VALUE = {
  name: "TestAddress",
  zip: "ABC",
  street: "Sesame Street",
  country: "The Underworld"
};

@Component({
  template: `<address-form [address]="currentAddress" [addressCount]="addressCount"></address-form>`
})
class HostComponent {
  @ViewChild(AddressFormContainer)
  testComponent: AddressFormContainer;

  addressCount = 0;
  currentAddress = undefined;
}

describe("AddressFormSpecs", () => {
    let fixture: ComponentFixture<HostComponent>;
    let component: AddressFormContainer;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
              HostComponent,
              AddressFormContainer
            ],
            providers: [
              FormBuilder
            ],
            imports: [ReactiveFormsModule],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance.testComponent;

        spyOn(component.submitAddress, "emit");
    });

    describe("given the container is initialized", () => {
        it("should have a form initialized", () => {
            fixture.detectChanges();
            expect(component.addressForm).toBeTruthy();
        });

        describe("when a new address is submitted", () => {
            beforeEach(() => {
              fixture.detectChanges();

              component.addressForm.setValue(MOCK_ADDRESS_FORM_VALUE);
              component.onSubmit();
            });

            it("should emit the address with the new id", () => {
              expect(component.submitAddress.emit).toHaveBeenCalledWith({
                  id: fixture.componentInstance.addressCount + 1,
                  name: MOCK_ADDRESS_FORM_VALUE.name,
                  addressDetails: {
                    zip: MOCK_ADDRESS_FORM_VALUE.zip,
                    street: MOCK_ADDRESS_FORM_VALUE.street,
                    country: MOCK_ADDRESS_FORM_VALUE.country
                  }
              });
            });

            it("should reset the form", () => {
              expect(component.addressForm.pristine).toEqual(true);
            })
        });

        describe("when an existing address is submitted", () => {
          beforeEach(() => {
            fixture.componentInstance.addressCount = 10;
            fixture.componentInstance.currentAddress = {
              id: 66,
              name: MOCK_ADDRESS_FORM_VALUE.name,
              addressDetails: {
                zip: MOCK_ADDRESS_FORM_VALUE.zip,
                street: MOCK_ADDRESS_FORM_VALUE.street,
                country: MOCK_ADDRESS_FORM_VALUE.country
              }
            };

            fixture.detectChanges();
            component.onSubmit();
          });

          it("should emit the updated address with the existing id", () => {
            expect(component.submitAddress.emit).toHaveBeenCalledWith({
                id: 66,
                name: MOCK_ADDRESS_FORM_VALUE.name,
                addressDetails: {
                  zip: MOCK_ADDRESS_FORM_VALUE.zip,
                  street: MOCK_ADDRESS_FORM_VALUE.street,
                  country: MOCK_ADDRESS_FORM_VALUE.country
                }
            });
          });

          it("should reset the form", () => {
            expect(component.addressForm.pristine).toEqual(true);
          });
      });
    });
});
