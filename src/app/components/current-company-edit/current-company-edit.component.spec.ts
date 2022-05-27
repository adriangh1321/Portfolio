import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentCompanyEditComponent } from './current-company-edit.component';

describe('CurrentCompanyEditComponent', () => {
  let component: CurrentCompanyEditComponent;
  let fixture: ComponentFixture<CurrentCompanyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentCompanyEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentCompanyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
