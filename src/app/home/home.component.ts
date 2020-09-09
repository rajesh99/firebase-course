import { Component, OnInit } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ResourcesService } from '../services/resources.service';
import { Lesson } from 'app/model/lesson';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    courses$: Observable<Course[]>;

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(private resourcesService: ResourcesService<Course, Lesson>) {

    }

    ngOnInit() {

        this.reloadCourses();

    }

    reloadCourses() {
        this.courses$ = this.resourcesService.loadAllResources();

        this.beginnersCourses$ = this.courses$.pipe(
            map(courses => courses.filter(
                course => course.categories.includes('BEGINNER'))));

        this.advancedCourses$ = this.courses$.pipe(
            map(courses => courses.filter(
                course => course.categories.includes('ADVANCED'))));
    }




}
