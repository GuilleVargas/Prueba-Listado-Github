import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importamos Router
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = null;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    const login = this.route.snapshot.paramMap.get('login')!;

    this.http
      .get(`https://api.github.com/users/${login}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.errorMessage = `Error: ${error.status} - ${error.message}`;
          return of({});
        })
      )
      .subscribe((user: any) => {
        this.user = user;
      });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
