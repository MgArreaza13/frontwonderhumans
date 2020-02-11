import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  profileForm: FormGroup; ;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.getProfile();
  }


  getProfile() {
    this.userService.getProfile().subscribe(
      (data:any) => {
        console.log(data);
        this.initForm(data)
      },
      (error)=> {
        console.log(error);
      }
    )
  }


  initForm(dataUser){
    // Build form
    this.profileForm = this.formBuilder.group({
      firstName: [dataUser.user.first_name , [
        Validators.required,
      ]],
      lastName: [dataUser.user.last_name , [
        Validators.required,
      ]],
      email: [dataUser.user.email , [
        Validators.required,
      ]],
      occupation: [dataUser.occupation , [
        Validators.required,
      ]],
      city: [dataUser.city , [
        Validators.required,
      ]],
      country: [dataUser.country , [
        Validators.required,
      ]],
      dateOfBirth: [dataUser.dateOfBirth , [
        Validators.required,
      ]],
      aboutYou: [dataUser.aboutYou , [
        Validators.required,
      ]],
    });
  }

  get f() { return this.profileForm.controls; }



}
