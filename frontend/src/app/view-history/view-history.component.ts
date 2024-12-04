import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service'
import { NgFor } from '@angular/common'
import { UserService } from '../user-service.service'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-view-history',
  standalone: true,
  imports: [NgFor, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.css'
})
export class ViewHistoryComponent {

  allWorkouts: any[] = []
  displayCount: number = 0
  dropdownOptions: number[] = [1]
  workoutsToDisplay: any[] = []

  constructor(private workoutService: WorkoutService, private userService: UserService, private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any[]>(`http://localhost:3000/${this.userService.getUsername()}`)
      .subscribe(
        (data) => {
          console.log(data)
          this.allWorkouts = data
          this.displayCount = this.allWorkouts.length
          this.dropdownOptions = Array.from({ length: this.displayCount }, (_, i) => i + 1)
          this.workoutsToDisplay = [...this.allWorkouts]
        }
      )
  }

  updateWorkoutLength() {
    this.workoutsToDisplay = this.allWorkouts.slice(0, this.displayCount)
  }

}
