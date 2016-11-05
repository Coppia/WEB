import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { Interview, InterviewService } from '../../shared';

@Injectable()
export class EditableInterviewResolver implements Resolve<any> {
    constructor(private interviewService: InterviewService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.interviewService.find(route.params['id'])
            .map(
                data => {
                    return data[0];
                }
            )
            .catch((err) => this.router.navigateByUrl('/interviews'));
    }
}
