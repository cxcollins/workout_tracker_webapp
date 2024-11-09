import { Component } from '@angular/core'
import { NgFor, NgIf } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { WorkoutService } from '../workout.service'
import { UserService } from '../user-service.service'
import { Router } from '@angular/router'

@Component({
  selector: 'add-workout',
  standalone: true,
  templateUrl: './add_workout.component.html',
  styleUrls: ['./add_workout.component.css'],
  imports: [NgFor, NgIf, FormsModule]
})
export class AddWorkoutComponent {

  constructor(private workoutService: WorkoutService, private userService: UserService, private router: Router) {}

  workouts = Array.from({ length: 1}, () => ({
    name: '',
    sets: Array.from({ length: 3 },  () => ({ weight: '', reps: '' }))
  }))

  submitForm() {
    this.workoutService.saveWorkout(this.userService.getUsername(), this.workouts)
    console.log('workout saved')
    this.workouts = Array.from({ length: 1}, () => ({
      name: '',
      sets: Array.from({ length: 3 },  () => ({ weight: '', reps: '' }))
    }))
    this.router.navigate(['/view-history'])
  }

}
