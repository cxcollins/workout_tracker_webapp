import { Component } from '@angular/core';
import { WorkoutService } from '../workout.service'
import { NgFor } from '@angular/common'
import { UserService } from '../user-service.service'

@Component({
  selector: 'app-view-history',
  standalone: true,
  imports: [NgFor],
  templateUrl: './view-history.component.html',
  styleUrl: './view-history.component.css'
})
export class ViewHistoryComponent {

  allWorkouts: any[] = []

  constructor(private workoutService: WorkoutService, private userService: UserService) {}

  ngOnInit() {
    this.allWorkouts = this.workoutService.getWorkouts(this.userService.getUsername())
    console.log(this.allWorkouts)
  }

}
