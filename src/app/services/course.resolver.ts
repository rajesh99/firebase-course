
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Course } from '../model/course';
import { Observable, of } from 'rxjs';
import { ResourcesService } from './resources.service';
import { Lesson } from 'app/model/lesson';



@Injectable()
export class CourseResolver implements Resolve<Course> {

    constructor(private resourcesService: ResourcesService<Course, Lesson>) {

    }

    resolve(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<Course> {

        const courseUrl = route.paramMap.get('courseUrl');


        return this.resourcesService.findResourceByUrl(courseUrl);

    }

}

