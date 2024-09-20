import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymenModalComponent } from './paymen-modal.component';

describe('PaymenModalComponent', () => {
  let component: PaymenModalComponent;
  let fixture: ComponentFixture<PaymenModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymenModalComponent]
    });
    fixture = TestBed.createComponent(PaymenModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
