import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  errorMessage: string = '';
  handleHttpError(error: HttpErrorResponse): void {
    console.error(`Error: ${error.status} - ${error.message}`);
  }
}
