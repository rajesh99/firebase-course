import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../model/course';
import { finalize, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Lesson } from '../model/lesson';
import { ResourcesService } from '../services/resources.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course: Course;

  lessons: Lesson[];

  lastPageLoaded = 0;

  loading = false;

  displayedColumns = ['seqNo', 'description', 'duration'];


  constructor(private route: ActivatedRoute,
    private resourcesService: ResourcesService<Course, Lesson>) {

  }

  ngOnInit() {

    this.course = this.route.snapshot.data['course'];
    console.log(this.course);

    this.loading = true;

    this.resourcesService.findLessonsByResourceId(this.course.id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(
        lessons => this.lessons = lessons
      );

  }

  loadMore() {

    this.lastPageLoaded++;

    this.loading = true;

    this.resourcesService.findLessonsByResourceId(this.course.id, 'asc',
      this.lastPageLoaded)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(lessons => this.lessons = this.lessons.concat(lessons));

  }

}
