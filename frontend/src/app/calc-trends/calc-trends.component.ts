import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service'
import { NgFor } from '@angular/common'
import { UserService } from '../user-service.service'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { concatMap} from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-calc-trends',
  standalone: true,
  imports: [NgFor, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './calc-trends.component.html',
  styleUrl: './calc-trends.component.css'
})
export class CalcTrendsComponent {

  dateSelected: boolean = false
  workoutHistory: any[] = []
  workoutHistoryObject: any
  workoutStats: any[] = []
  exerciseName: string = ''
  date: string = ''

  constructor(private workoutService: WorkoutService, private userService: UserService, private http: HttpClient) {}

  onSubmit() {
    this.workoutStats = []

    this.http
    .get<any[]>(`http://localhost:5002/wipe-workout-log`)
    .subscribe(
      data => {
        console.log('Successfully wiped text file: ', data)
      }
    )

    this.http
      .get<any[]>(`http://localhost:3000/${this.userService.getUsername()}/${this.exerciseName}/${this.date}`)
      .subscribe(
        data => {
          console.log(data)
          console.log(this.workoutHistory)
          this.workoutHistory = data
        }
      )

    this.http
      .post('http://localhost:5002/add_workout_to_list', this.workoutHistory)
      .subscribe(response => {
        console.log(response)
      })
  
    if(this.date === '') {
      this.http
        .get(`http://localhost:5002/calculate_average_weight/${this.exerciseName}`)
        .subscribe(
          data => {
            this.workoutStats.push(data)
          }
        )

      this.http
        .get(`http://localhost:5002/calculate_average_reps/?name=${this.exerciseName}`)
        .subscribe(
          data => {
            this.workoutStats.push(data)
          }
        )

      this.http
        .get(`http://localhost:5002/calculate_average_sets/`)
        .subscribe(
          data => {
            this.workoutStats.push(data)
          }
        )
      
        }

    else {
    this.http
      .get(`http://localhost:5002/identify_trends`)
      .subscribe(
        data => {
          this.workoutStats.push(data)
        }
      )
    }
    }
}
