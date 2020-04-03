import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent implements OnInit {
  public blogs;
  //initialize the call using BlogService 
  constructor(private _myService: BlogService) { }
  ngOnInit() {
    this.getBlogs();
  }
  //method called OnInit
  getBlogs() {
   this._myService.getBlogs().subscribe(
      //read data and assign to public variable blogs
      data => { this.blogs = data},
      err => console.error(err),
      () => console.log('finished loading')
    );
  }
  onDelete(blogId: string) {
    this._myService.deleteBlog(blogId);
  }
}