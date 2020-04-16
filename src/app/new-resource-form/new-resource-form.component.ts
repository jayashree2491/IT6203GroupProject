import { Component, OnInit, Input } from '@angular/core';
import { ResourceService } from '../resource.service';
import {Router} from '@angular/router';
import {ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-new-resource-form',
  templateUrl: './new-resource-form.component.html',
  styleUrls: ['./new-resource-form.component.css']
})
export class NewResourceFormComponent implements OnInit {
  @Input() rtype: string;
  @Input() rtitle: string;
  @Input() rnote: string;
public mode = 'Add';
private id: string;

  constructor(private _myService: ResourceService, private router: Router, public route: ActivatedRoute) { }
  onSubmit() {
    console.log("You submitted: " + this.rtype + " " + this.rtitle + " " + this.rnote)
    if(this.mode == 'Add')
      this._myService.addResources(this.rtype, this.rtitle , this.rnote);
    if(this.mode == 'Edit')
    this._myService.updateResource(this.id, this.rtype, this.rtitle, this.rnote);
      this.router.navigate(['/listResources']);
  }
  ngOnInit(){
    this.route.paramMap.subscribe((paramMap: ParamMap ) => {
      if (paramMap.has('_id'))
        { this.mode = 'Edit'; /*request had a parameter _id */ 
          this.id = paramMap.get('_id');}
      else {this.mode = 'Add';
          this.id = null; }              
    });
  }
  
}
