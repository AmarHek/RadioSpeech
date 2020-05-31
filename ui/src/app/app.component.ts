import { Component } from '@angular/core';
import { faLaptopMedical } from '@fortawesome/free-solid-svg-icons'; 


declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  faUser = faLaptopMedical;
}