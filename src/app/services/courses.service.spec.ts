import { TestBed } from '@angular/core/testing';

import { ResourcesService } from './resources.service';
import { Lesson } from '../model/lesson';
import { Course } from '../model/course';


describe('CoursesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourcesService<Course, Lesson> = TestBed.get(ResourcesService);
    expect(service).toBeTruthy();
  });
});
