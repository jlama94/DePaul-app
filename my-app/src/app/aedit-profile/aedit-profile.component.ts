import { Component, OnInit } from '@angular/core';
import {DataService} from "../data.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../models/user";
import * as type from '../globals';
import {Router} from "@angular/router";

@Component({
  selector: 'app-aedit-profile',
  templateUrl: './aedit-profile.component.html',
  styleUrls: ['./aedit-profile.component.css']
})
export class AeditProfileComponent implements OnInit {
  public depaulForm2: FormGroup;
  public user: User; // Store the new user in this User object
  DepaulID: string;

  constructor(private router: Router, private service: DataService) { }

  ngOnInit() {
    this.depaulForm2 = new FormGroup({
      firstName: new FormControl(type.firstName,[Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      lastName: new FormControl(type.lastName,[Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      address: new FormControl(type.address,Validators.required),
      city: new FormControl(type.city,Validators.required),
      state: new FormControl(type.state,[Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      zip: new FormControl(type.zip,Validators.required),
      depaulID: new FormControl(type.DepaulID),
      degree: new FormControl(type.degree,Validators.required),
      email: new FormControl(type.email,[Validators.required, Validators.email]),
      userID: new FormControl(type.userName,[Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
      password: new FormControl(type.password,[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]),
      userType: new FormControl(type.userType),
    });
    this.DepaulID=type.DepaulID;
  }


  /**
   *
   * @param depaulForm2
   */
  addUser(depaulForm2) {
    if(depaulForm2.valid) {

      this.service.deleteUser(parseInt(type.DepaulID)).subscribe(res =>{
        // console.log("Profile delete");
      });
      this.user = this.depaulForm2.value;
      type.setUser(this.user.userID, this.user.password, this.user.firstName, this.user.lastName, this.user.degree,this.user.address,this.user.city,this.user.zip.toString(),this.user.state,this.user.depaulID.toString(),this.user.email);
      this.service.addUser(this.user).subscribe((user: User) => {
        // console.log("Profile editted");

      });
      this.router.navigateByUrl("/view-profile");
      return this.reset();
    }
    return this.reset();
  }

  reset() {
    this.depaulForm2.reset({ firstName: type.firstName,
      lastName: type.lastName,
      address: type.address,
      city: type.city,
      state: type.state,
      zip: type.zip,
      degree: type.degree,
      email: type.email,
      userID: type.userName,
      password: type.password,
      depaulID:type.DepaulID,
      userType: type.userType
    });
  }
}
