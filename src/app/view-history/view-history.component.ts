import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service'
import { NgFor } from '@angular/common'
import { UserService } from '../user-service.service'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-view-history',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.css'
})
export class ViewHistoryComponent {

  allWorkouts: any[] = []
  displayCount: number = 0
  dropdownOptions: number[] = [1]
  workoutsToDisplay: any[] = []

  constructor(private workoutService: WorkoutService, private userService: UserService) {}

  ngOnInit() {
    this.allWorkouts = this.workoutService.getWorkouts(this.userService.getUsername())
    this.displayCount = this.allWorkouts.length
    this.dropdownOptions = Array.from({ length: this.displayCount }, (_, i) => i + 1)
    this.workoutsToDisplay = [...this.allWorkouts]
  }

  updateWorkoutLength() {
    this.workoutsToDisplay = this.allWorkouts.slice(0, this.displayCount)
  }

}
