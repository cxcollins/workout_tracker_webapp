import { Routes, provideRouter } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AddWorkoutComponent } from './add_workout/add_workout.component';
import { ViewHistoryComponent } from './view-history/view-history.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'add-workout', component: AddWorkoutComponent},
    { path: 'view-history', component: ViewHistoryComponent}
]
