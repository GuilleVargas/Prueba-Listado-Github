import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss'],
})
export class UserSearchComponent {
  searchQuery: string = '';
  users: any[] = [];
  errorMessage: string | null = null;

  constructor(private http: HttpClient) {}

  onSearch(): void {
    this.errorMessage = null;
    this.http
      .get(`https://api.github.com/search/users?q=${this.searchQuery}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage = `Error: ${error.status} - ${error.message}`;
          return of({ items: [] });
        })
      )
      .subscribe((response: any) => {
        this.users = response.items.slice(0, 10);
      });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.users = [];
    this.errorMessage = null;
  }
}
