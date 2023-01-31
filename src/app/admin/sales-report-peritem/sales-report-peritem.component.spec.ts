import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportPeritemComponent } from './sales-report-peritem.component';

describe('SalesReportPeritemComponent', () => {
  let component: SalesReportPeritemComponent;
  let fixture: ComponentFixture<SalesReportPeritemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesReportPeritemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesReportPeritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
