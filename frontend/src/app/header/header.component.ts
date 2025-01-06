import { Component } from '@angular/core'
import { RouterModule, Router } from '@angular/router'
import { UserService } from '../user-service.service'
import { CommonModule, NgIf } from '@angular/common'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  username: string = ' '

  constructor(private router: Router, private userService: UserService) {}

  ngDoCheck() {
    this.username = this.userService.getUsername()
  }

  getUsername() {
    return this.userService.getUsername()
  }

  logout() {
    console.log('logging out', this.username)
    console.log(this.userService.getUsername())
    this.userService.setUsername('')
    this.router.navigate(['/'])
    console.log(this.userService.getUsername())
  }
}
