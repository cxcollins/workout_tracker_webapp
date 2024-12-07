import { Component } from '@angular/core';
import { NgFor } from '@angular/common'
import { HttpClientModule, HttpClient } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-get-quote',
  standalone: true,
  imports: [NgFor, HttpClientModule, CommonModule, FormsModule],
  templateUrl: './get-quote.component.html',
  styleUrl: './get-quote.component.css'
})
export class GetQuoteComponent {

  quote: string = ''

  constructor(private http: HttpClient) {}

  onSubmit() {
    fetch('http://localhost:5001/get-quote')
      .then(response => response.text())
      .then(quote => {
      console.log('Quote received:', quote);
      this.quote = quote
      })
      .catch(error => console.error('Error:', error));

  }

}
