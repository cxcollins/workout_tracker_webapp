import { Component } from '@angular/core';
import { NgFor } from '@angular/common'
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
export class LookupStandardComponent {

  age: number = 0
  weight: number = 0
  sex: string = ''
  workouts: any[] = []
  goodDataFlag: boolean = false

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http
    .get<any[]>(`http://localhost:3000/lifting-stats?age=${this.age}&weight=${this.weight}&sex=${this.sex}`)
    .subscribe(
      (data) => {
        this.workouts = data
        // Figure out how to see if any of the series contain NaN
        this.goodDataFlag = true
        console.log(data)
      },
      (error) => {
        if (error.status === 404) {
          this.goodDataFlag = false
          this.workouts = []
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
