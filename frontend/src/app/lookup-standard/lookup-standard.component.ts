import { Component } from '@angular/core';
import { NgFor } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-lookup-standard',
  standalone: true,
  imports: [NgFor, FormsModule, HttpClientModule, CommonModule],
  templateUrl: './lookup-standard.component.html',
  styleUrl: './lookup-standard.component.css'
})
export class LookupStandardComponent {

  age: number = 0
  weight: number = 0
  sex: string = ''
  workouts: any[] = []
  badDataFlag: boolean = false
  M: string = 'M'
  F: string = 'F'
  exercise_names: string[] = ['Deadlift', 'Bench press', 'Squat']

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http
    .get<any[]>(`http://localhost:5000/lifting-stats?age=${this.age}&weight=${this.weight}&sex=${this.sex}`)
    .subscribe(
      (data) => {
        this.workouts = data
        // Figure out how to see if any of the series contain NaN
        this.badDataFlag = false
        console.log(data)
      },
      (error) => {
        if (error.status === 404) {
          this.badDataFlag = true
          this.workouts = []
        }
        else {
          console.log('There is some sort of other error', error)
        }
      }
    )
  }

}
