import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class ResourceService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data 
    getResources() {
        return this.http.get('http://localhost:8000/resources');
    }
    // Uses http.post() to post data 
    addResources(rtype: string, rtitle: string, rnote: string) {
        this.http.post('http://localhost:8000/resources',{ rtype, rtitle, rnote })
      .subscribe((responseData) => {
         console.log(responseData);
       }); 
  }
    deleteResource(resourceId: string) {
        this.http.delete("http://localhost:8000/resources/" + resourceId)
          .subscribe(() => {
              console.log('Deleted: ' + resourceId);
          });
        location.reload();
      }  
    updateResource(resourceId: string,rtype: string, rtitle: string, rnote: string) {
          this.http.put("http://localhost:8000/resources/" 
               + resourceId,{ rtype, rtitle, rnote })
              .subscribe(() => {
                  console.log('Updated: ' + resourceId);
          });
        }      
}
