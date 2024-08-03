import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceSearchClientComponent } from './advance-search-client.component';

describe('AdvanceSearchClientComponent', () => {
  let component: AdvanceSearchClientComponent;
  let fixture: ComponentFixture<AdvanceSearchClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvanceSearchClientComponent]
    });
    fixture = TestBed.createComponent(AdvanceSearchClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
