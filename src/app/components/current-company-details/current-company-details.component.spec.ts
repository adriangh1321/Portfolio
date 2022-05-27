import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCompanyDetailsComponent } from './current-company-details.component';

describe('CurrentCompanyDetailsComponent', () => {
  let component: CurrentCompanyDetailsComponent;
  let fixture: ComponentFixture<CurrentCompanyDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentCompanyDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCompanyDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
