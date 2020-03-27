import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityOrderComponent } from './quantity-order.component';

describe('QuantityOrderComponent', () => {
  let component: QuantityOrderComponent;
  let fixture: ComponentFixture<QuantityOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
