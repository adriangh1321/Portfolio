import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterestEditComponent } from './interest-edit.component';

describe('InterestEditComponent', () => {
  let component: InterestEditComponent;
  let fixture: ComponentFixture<InterestEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterestEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterestEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
