import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Rx';

import { IdeaService } from '../../shared';

@Injectable()
export class EditableIdeaResolver implements Resolve<any> {
    constructor(private ideaService: IdeaService, private router: Router) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<any> {
        return this.ideaService.find(route.params['id'])
            .map(
                data => {
                    return data;
                }
            )
            .catch((err) => this.router.navigateByUrl('/ideas'));
    }
}
