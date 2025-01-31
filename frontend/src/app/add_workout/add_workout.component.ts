import { Component } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WorkoutService } from '../workout.service'
import { UserService } from '../user-service.service'
import { Router } from '@angular/router'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { forkJoin } from 'rxjs';

interface WorkoutResponseObject {
  person: string,
  date: string,
  exercise_name: string,
  weight: string,
  reps: string,
}

@Component({
  selector: 'add-workout',
  standalone: true,
  templateUrl: './add_workout.component.html',
  styleUrls: ['./add_workout.component.css'],
  imports: [NgFor, NgIf, FormsModule, HttpClientModule]
})
export class AddWorkoutComponent {

  showTooltip = false

  constructor(private workoutService: WorkoutService, private userService: UserService, private router: Router, private http: HttpClient) {}

  workouts = Array.from({ length: 1}, () => ({
    name: '',
    sets: Array.from({ length: 3 },  () => ({ weight: '', reps: '' }))
  }))

  date: Date = new Date()

  submitForm() {

    // Filter out sets that have missing/incorrect weight or reps
    this.workouts = this.workouts.filter(workout => ({
      ...workout,
      sets: workout.sets.filter(set => set.weight && set.reps)
    }))

  //   this.workouts[0].sets.forEach(set => {
  //     const obj: WorkoutResponseObject = {
  //       person: this.userService.getUsername(),
  //       date: this.date.toISOString().split('T')[0],
  //       exercise_name: this.workouts[0].name,
  //       weight: set.weight,
  //       reps: set.reps
  //     }

  //   this.http.post('http://localhost:3000/save-workout', obj)
  //     .subscribe(response => {
  //       console.log(response)
  //     })

  //   }
  
  // )
    // this.router.navigate(['/view-history'])

    const requests = this.workouts[0].sets.map(set => {
      const obj: WorkoutResponseObject = {
        person: this.userService.getUsername(),
        date: this.date.toISOString().split('T')[0],
        exercise_name: this.workouts[0].name,
        weight: set.weight,
        reps: set.reps
      };
  
      return this.http.post('http://localhost:3000/save-workout', obj, { observe: 'response' })
    });
  
    forkJoin(requests).subscribe(
      responses => {
        console.log(responses)
        const allSuccessful = responses.every(response =>
          response.status === 201 || response.status === 204
        )
  
        if (allSuccessful) {
          console.log('All workouts saved successfully')
          this.router.navigate(['/view-history'])
        } else {
          console.error('One or more responses did not meet success criteria');
        }
      },
      error => {
        console.error('Error saving workouts:', error);
      }
    );

}
}
