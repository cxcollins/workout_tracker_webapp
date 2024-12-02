import { Component } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WorkoutService } from '../workout.service'
import { UserService } from '../user-service.service'
import { Router } from '@angular/router'
import { HttpClientModule, HttpClient } from '@angular/common/http'

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
    this.workoutService.saveWorkout(this.userService.getUsername(), this.workouts)
    console.log('workout saved')

    console.log('workout: ', this.workouts)

    const obj: WorkoutResponseObject = {
      person: this.userService.getUsername(),
      date: this.date.toISOString().split('T')[0],
      exercise_name: this.workouts[0].name,
      weight: this.workouts[0].sets[0].weight,
      reps: this.workouts[0].sets[0].reps
    }

    console.log('workout obj: ', obj)

    this.http
      .post('http://localhost:3000/save-workout', obj)
      .subscribe((response) => {
        console.log('Data submitted', response)
      })

    
    this.workouts = Array.from({ length: 1}, () => ({
        name: '',
        sets: Array.from({ length: 3 },  () => ({ weight: '', reps: '' }))
      }))

    this.router.navigate(['/view-history'])
  }

}
