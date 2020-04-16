import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title and image display
  title = 'Mental Health Blog';
  ksuImage = '/assets/KSULogo.png/';
  //I declared properties to get the menu to work. 
  events;
  opened;
  closed;
  tableColumns : string [] = ['resource._id', 'rtype', 'rtitle', 'rnote', 'actions'];
}
