import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BlogService {

    constructor(private http: HttpClient) { }

    // Uses http.get() to load data 
    getBlogs() {
        return this.http.get('http://localhost:8000/blogs');
    }

    // Uses http.post() to post data 
    addBlogs(blogDate: string, blogAuthor: string, blogTopic: string, blogContent: string) {
        this.http.post('http://localhost:8000/blogs', { blogDate, blogAuthor, blogTopic, blogContent })
            .subscribe((responseData) => {
                console.log(responseData);
            });
            location.reload();
    }
    deleteBlog(blogId: string) {
        this.http.delete("http://localhost:8000/blogs/" + blogId)
          .subscribe(() => {
              console.log('Deleted: ' + blogId);
          });
          location.reload();
      }

      updateBlog(blogId: string, blogDate: string, blogAuthor: string, blogTopic: string, blogContent: string) {
        //request path http://localhost:8000/blogs/5xbd456xx 
        //first and last names will be send as HTTP body parameters 
            this.http.put("http://localhost:8000/blogs/" 
                 + blogId,{ blogDate, blogAuthor, blogTopic, blogContent })
              .subscribe(() => {
                  console.log('Updated: ' + blogId);
              });
              location.reload();
        }

        getBlogById(blogId: string) {
            return this.http.get('http://localhost:8000/blogs/' + blogId);
        }   
            }
