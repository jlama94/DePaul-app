import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {Courses} from "../models/courses";

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Courses[] = [];

  constructor(private service: DataService) { }

  ngOnInit() {
    this.getAllCDMcourses();
  }

  /**
   * Get all the CDM courses available.
   */
  getAllCDMcourses() {
    this.service.getCourses().subscribe((courses: Courses[]) => {
      this.courses = courses;
      // console.log(courses);
    });
  }
}
