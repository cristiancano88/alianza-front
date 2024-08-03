import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'clients';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // this.http.get<BackendContent>('http://localhost:8080/greetings').subscribe(data => {
    this.http.get<any>('http://localhost:8080/clients').subscribe((data) => {
      console.log({ data });
    });
  }
}
