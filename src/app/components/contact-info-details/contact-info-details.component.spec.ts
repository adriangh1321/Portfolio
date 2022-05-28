import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoDetailsComponent } from './contact-info-details.component';

describe('ContactInfoDetailsComponent', () => {
  let component: ContactInfoDetailsComponent;
  let fixture: ComponentFixture<ContactInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactInfoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
