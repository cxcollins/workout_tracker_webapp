import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'add-workout',
  standalone: true,
  templateUrl: './add_workout.component.html',
  styleUrls: ['./add_workout.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class AddWorkoutComponent {
  workoutForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.workoutForm = this.fb.group({
      exerciseName: ['', Validators.required],
      setCount: [1, Validators.required],
      sets: this.fb.array([]),
    });
    this.updateSets(); // Initialize with default set count
  }

  // Accessor for the FormArray of sets
  get sets(): FormArray {
    return this.workoutForm.get('sets') as FormArray;
  }

  // Create a new set FormGroup with weight and reps inputs
  createSet(): FormGroup {
    return this.fb.group({
      weight: ['', Validators.required],
      reps: ['', Validators.required],
    });
  }

  // Update the sets array based on set count
  updateSets(): void {
    this.sets.clear(); // Clear existing sets
    const setCount = this.workoutForm.get('setCount')?.value || 1;
    for (let i = 0; i < setCount; i++) {
      this.sets.push(this.createSet());
    }
  }

  // Add a new set row
  addSetRow(): void {
    this.sets.push(this.createSet());
  }

  // Submit the form and log values
  submitForm(): void {
    console.log(this.workoutForm.value);
  }
}
