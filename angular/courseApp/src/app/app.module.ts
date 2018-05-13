import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { CourseListComponent } from './course-list/course-list.component';
import { DataServiceService } from './data-service.service';
import { UsersComponent } from './users/users.component';
import { AddUserComponent } from './addUser/addUser.component';
import { AddCourseComponent } from './addCourse/addCourse.component';

/* Paths */
const routes = [
  {path: 'users', component: UsersComponent},
  {path: 'courses', component: CourseListComponent},
  {path: 'user', component: AddUserComponent},
  {path: 'course', component: AddCourseComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    UsersComponent,
    AddUserComponent,
    AddCourseComponent
],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
