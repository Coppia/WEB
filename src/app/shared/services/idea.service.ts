import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import { ApiService } from './api.service';
import { Idea } from '../models';

@Injectable()
export class IdeaService {
  private apiPath = '/ideas/';

  constructor(
    private apiService: ApiService
  ) {}

  get(): Observable<Idea[]> {
    return this.apiService.get(`${this.apiPath}`)
           .map(this.extractIdeas);
  }

  find(id: number): Observable<Idea> {
     return this.apiService.get(`${this.apiPath}${id}`)
           .map(this.extractIdea);
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

  private extractIdea(idea: Idea) {
    idea.created_date = new Date(idea.created_date);
    return idea;
  }

  private extractIdeas(data: Idea[]) {
    data.forEach((d) => {
      d.created_date = new Date(d.created_date);
    });
    return data;
  }

}
