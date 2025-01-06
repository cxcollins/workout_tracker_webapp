import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service'
import { NgFor } from '@angular/common'
import { UserService } from '../user-service.service'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-lookup-user',
  standalone: true,
  imports: [NgFor, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './lookup-user.component.html',
  styleUrl: './lookup-user.component.css'
})
export class LookupUserComponent {

  username: string = ''

  badSearchFlag: boolean = false

  allWorkouts: any[] = []
  displayCount: number = 0
  dropdownOptions: number[] = [1]
  workoutsToDisplay: any[] = []

  constructor(private workoutService: WorkoutService, private userService: UserService, private http: HttpClient) {}

  onSubmit() {
    this.http
    .get<any[]>(`http://localhost:3000/${this.username}`)
    .subscribe(
      (data) => {
        console.log(data)
        this.badSearchFlag = false
        console.log(data)
        this.allWorkouts = data
        this.displayCount = this.allWorkouts.length
        this.dropdownOptions = Array.from({ length: this.displayCount }, (_, i) => i + 1)
        this.workoutsToDisplay = [...this.allWorkouts]
      },
      (error) => {
        if (error.status === 404) {
          this.badSearchFlag = true
          this.allWorkouts = []
          this.displayCount = 0
          this.dropdownOptions = []
          this.workoutsToDisplay = []
        }
        else {
          console.log('There is some sort of other error')
        }
      }
    )
  }

  updateWorkoutLength() {
    this.workoutsToDisplay = this.allWorkouts.slice(0, this.displayCount)
  }

}
