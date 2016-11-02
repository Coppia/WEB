import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Snippet } from '../models';

@Injectable()
export class SnippetService {
  private apiPath = '/snippets/';

  constructor(
    private apiService: ApiService
  ) {}

  get(): Observable<Snippet[]> {
    return this.apiService.get(`${this.apiPath}`)
           .map(response => {
             let result = <Snippet[]>this.apiService.extractDatas(response);
             return result; });
  }

  find(id: number): Observable<Snippet> {
     return this.apiService.get(`${this.apiPath}${id}`)
           .map(response => {
             let result = <Snippet>this.apiService.extractData(response);
             return result; });
  }

  put(snippet: Snippet): Observable<any> {
    let update = {
      snippet_id: snippet.id,
      text: snippet.text,
      interview_id: snippet.interview_id,
      update_user: snippet.updated_by
    };
    return this.apiService.put(`${this.apiPath}${snippet.id}`, update)
             .map(data => data);
  }

  post(snippet: Snippet): Observable<any> {
    return this.apiService.post(`${this.apiPath}`, snippet)
             .map(data => data);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`${this.apiPath}${id}`)
           .map(data => data);
  }
}
