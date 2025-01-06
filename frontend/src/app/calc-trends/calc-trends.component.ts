import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service'
import { NgFor } from '@angular/common'
import { UserService } from '../user-service.service'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { concatMap } from 'rxjs/operators'
import { Observable, forkJoin } from 'rxjs'

interface Workout {
  exercise_name: string
  date: string
  weight: number
  reps: number
}

interface Set {
  reps: number
  weight: number
}

interface TransformedWorkout {
  name: string
  set: Set[]
}

interface WeightResponse {
  average_weight_per_set: number
}

interface RepResponse {
  average_reps_per_set: number
}

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

  transformData(workouts: Workout[]) {
    const groupedData: Record<string, Record<string, { reps: number; weight: number }[]>> = {}

    workouts.forEach(workout => {
      const exerciseName: string = workout.exercise_name
      const date = workout.date

      if (!groupedData[exerciseName]) {
        groupedData[exerciseName] = {}
      }

      if (!groupedData[exerciseName][date]) {
        groupedData[exerciseName][date] = []
      }

      groupedData[exerciseName][date].push({
        reps: workout.reps,
        weight: workout.weight
      })
    })

    const finalData = []

    for (let exercise in groupedData) {
      for (let date in groupedData[exercise]) {
        finalData.push({
          name: exercise,
          sets: groupedData[exercise][date]
        })
      }
    }

    return finalData
  }

  onSubmit() {
    console.log(this.date)

    this.workoutStats = []

    if(this.date !== '') {

      this.dateSelected = true

      this.http
        .get<any[]>(`http://localhost:3000/${this.userService.getUsername()}/${this.exerciseName}/${this.date}`)
        .pipe(
          concatMap( (data) => {
            this.workoutHistory = data;
            const transformedData = this.transformData(this.workoutHistory)
            return this.http.post('http://localhost:5002/add_workout_to_list', transformedData)
          }
        ),
        concatMap( (res) => {
          return this.http.get(`http://localhost:5002/calculate_average_weight?name=${this.exerciseName}`)
        }),
        concatMap( weight => {
          console.log(weight)
          this.workoutStats.push(weight)
          return this.http.get(`http://localhost:5002/calculate_average_reps?name=${this.exerciseName}`)
        }),
        concatMap( reps => {
          this.workoutStats.push(reps)
          return this.http.get(`http://localhost:5002/calculate_average_sets`)
        })
      )
        .subscribe( sets => {
          this.workoutStats.push(sets)
          this.workoutStats.reverse()
          console.log(this.workoutStats)
        },
      error => {
        console.log(error)
      })
    }

    else {
      this.dateSelected = false
      
      this.http
      .get<any[]>(`http://localhost:3000/${this.userService.getUsername()}/${this.exerciseName}`)
      .pipe(
        concatMap( (data) => {
          this.workoutHistory = data
          const postRequests = this.workoutHistory.map(workout => {
            console.log(workout)
            const transformedData = this.transformData([workout])
            console.log(transformedData);
    
            return this.http.post('http://localhost:5002/add_workout_to_list', transformedData);
          });
    
          return forkJoin(postRequests);
        }),
        concatMap( (res) => {
          return this.http.get(`http://localhost:5002/calculate_average_weight?name=${this.exerciseName}`)
        }),
        concatMap( weight => {
          console.log(weight)
          // this.workoutStats.push(weight)
          return this.http.get(`http://localhost:5002/calculate_average_reps?name=${this.exerciseName}`)
        }),
        concatMap( reps => {
          // this.workoutStats.push(reps)
          return this.http.get(`http://localhost:5002/calculate_average_sets`)
        }),
        concatMap( sets => {
          return this.http.get(`http://localhost:5002/identify_trends`)
        })
      )
        .subscribe( trends => {
          Object.values(trends).forEach(value => {
            this.workoutStats.push(value)
          })
          console.log(trends)
        },
      error => {
        console.log(error)
      })
      }


    // else {
    // this.http
    //   .get(`http://localhost:5002/identify_trends`)
    //   .subscribe(
    //     data => {
    //       this.workoutStats.push(data)
    //     }
    //   )
    // }

    // this.workoutStats = [
    //   5, 30, -0.67
    // ]

    }
}
