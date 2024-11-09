import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { UserService } from '../user-service.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username: string  = ''

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    this.userService.setUsername(this.username)
    console.log('The service has assigned:', this.userService.getUsername())
    this.router.navigate(['/add-workout'])
  }
}
