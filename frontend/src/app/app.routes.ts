import { Routes, provideRouter } from '@angular/router'
import { LoginComponent } from './login/login.component'
import { AddWorkoutComponent } from './add_workout/add_workout.component'
import { ViewHistoryComponent } from './view-history/view-history.component'
import { LookupUserComponent } from './lookup-user/lookup-user.component'
import { GetQuoteComponent } from './get-quote/get-quote'
import { LookupStandardComponent } from './lookup-standard/lookup-standard.component'
import { CalcTrendsComponent } from './calc-trends/calc-trends.component'

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'add-workout', component: AddWorkoutComponent },
    { path: 'view-history', component: ViewHistoryComponent },
    { path: 'lookup-user', component: LookupUserComponent },
    { path: 'get-quote', component: GetQuoteComponent },
    { path: 'lookup-standard', component: LookupStandardComponent },
    { path: 'calc-trends', component: CalcTrendsComponent }
]
