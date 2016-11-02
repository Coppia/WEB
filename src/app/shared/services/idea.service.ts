import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Idea, Snippet } from '../models';

@Injectable()
export class IdeaService {
  private apiPath = '/ideas/';

  constructor(
    private apiService: ApiService
  ) {}

  get(): Observable<Idea[]> {
    return this.apiService.get(`${this.apiPath}`)
           .map(response => {
             let result = <Idea[]>this.apiService.extractDatas(response);
             return result; });
  }

  find(id: number): Observable<Idea> {
     return this.apiService.get(`${this.apiPath}${id}`)
          .map(response => {
             let result = <Idea>this.apiService.extractData(response);
             return result; });
  }

  put(idea: Idea): Observable<any> {
    let update = {idea_id: idea.id, title: idea.title, goal: idea.goal, status: idea.status, update_user: idea.updated_by};
    return this.apiService.put(`${this.apiPath}${idea.id}`, update)
             .map(data => data);
  }

  post(idea: Idea): Observable<any> {
    return this.apiService.post(`${this.apiPath}`, idea)
             .map(data => data);
  }

  delete(id: number): Observable<any> {
    return this.apiService.delete(`${this.apiPath}${id}`)
           .map(data => data);
  }

  snippets(id: number): Observable<Snippet[]> {
     return this.apiService.get(`${this.apiPath}idea_snippet/${id}`)
           .map(response => {
             let result = <Snippet[]>this.apiService.extractDatas(response);
             return result; });
  }
}
