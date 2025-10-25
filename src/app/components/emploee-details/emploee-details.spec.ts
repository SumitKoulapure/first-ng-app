import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploeeDetails } from './emploee-details';

describe('EmploeeDetails', () => {
  let component: EmploeeDetails;
  let fixture: ComponentFixture<EmploeeDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploeeDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploeeDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
