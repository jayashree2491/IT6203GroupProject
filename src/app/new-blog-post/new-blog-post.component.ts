import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BlogService } from '../blog.service';
import { Router } from '@angular/router';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-new-blog-post',
  templateUrl: './new-blog-post.component.html',
  styleUrls: ['./new-blog-post.component.css']
})

export class NewBlogPostComponent implements OnInit {
  blogForm = new FormGroup({
    blogDate: new FormControl('', Validators.required),
    blogAuthor: new FormControl('', Validators.required),
    blogTopic: new FormControl('', Validators.required),
    blogContent: new FormControl('', Validators.required),
  })
  public blogFormData
  public mode = 'Add';//default mode
  public id: string;//blog ID


  constructor(private _myService: BlogService, private router: Router, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('_id')) {
        this.mode = 'Edit'; /*request had a parameter _id */
        this.id = paramMap.get('_id');
        this._myService.getBlogById(this.id).subscribe(
          data => {
            this.blogFormData = data;
            console.log(this.blogFormData);
            this.blogForm.patchValue({ blogDate: this.blogFormData.blogDate });
            this.blogForm.patchValue({ blogAuthor: this.blogFormData.blogAuthor });
            this.blogForm.patchValue({ blogTopic: this.blogFormData.blogTopic });
            this.blogForm.patchValue({ blogContent: this.blogFormData.blogContent });
          },
          err => console.error(err),
          () => console.log('finished loading blog')
        );
      }
      else {
        this.mode = 'Add';
        this.id = null;
      }
    });

  }
  momentDateConverter() {
      
  this.blogForm.value.blogDate = moment().format('MMMM Do YYYY, h:mm:ss a');
    
  }
  onSubmit() {
    if (this.mode == 'Add')
    this._myService.addBlogs(this.blogForm.value.blogDate, this.blogForm.value.blogAuthor, this.blogForm.value.blogTopic, this.blogForm.value.blogContent);
    console.log(this.blogFormData)
    if (this.mode == 'Edit')
    this._myService.updateBlog(this.id, this.blogForm.value.blogDate, this.blogForm.value.blogAuthor, this.blogForm.value.blogTopic, this.blogForm.value.blogContent);
    window.location.assign('./listBlogs/')
  
  
  }
  resetForm() {
    this.blogForm.value.blogDate = " ";
    this.blogForm.value.blogAuthor = " ";
    this.blogForm.value.blogTopic = " ";
    this.blogForm.value.blogContent = " ";
  }
}