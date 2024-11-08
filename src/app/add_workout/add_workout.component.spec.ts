import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSetsComponent } from './add_workout.component';

describe('AddSetsComponent', () => {
  let component: AddSetsComponent;
  let fixture: ComponentFixture<AddSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
