import { Component, OnInit } from '@angular/core';
import { ResourceService } from '../resource.service';

@Component({
  selector: 'app-list-resources',
  templateUrl: './list-resources.component.html',
  styleUrls: ['./list-resources.component.css']
})
export class ListResourcesComponent implements OnInit {
  tableColumns : string [] = ['resource._id', 'rtype', 'rtitle', 'rnote', 'actions'];
  public resources;
  //initialize the call using ResourceService 
  constructor(private _myService: ResourceService) { }
  ngOnInit() {
    this.getResources();
  }
  //method called OnInit
  getResources() {
   this._myService.getResources().subscribe(
      //read data and assign to public variable resources
      data => { this.resources = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  }
  onDelete(resourceId: string) {
    this._myService.deleteResource(resourceId);
  }
}
