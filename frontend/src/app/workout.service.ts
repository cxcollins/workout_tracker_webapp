import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  constructor() {}

  saveWorkout(username: string | null, workout: any): void {
    const currentHistory = this.getWorkouts(username)
    const storageKey = 'workout-history' + username
    currentHistory.push(workout)
    localStorage.setItem(storageKey, JSON.stringify(currentHistory))
  }

  getWorkouts(username: string | null): any[] {
    const storageKey = 'workout-history' + username
    const history = localStorage.getItem(storageKey)
    return history ? JSON.parse(history) : []
  }
}
