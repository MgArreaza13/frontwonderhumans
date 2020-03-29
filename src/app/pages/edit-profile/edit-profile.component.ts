import { Router } from '@angular/router';
import { Profile } from './../../shared/models/profile';
import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  hasProfile: boolean = false;
  submitted: boolean;
  profileForm: FormGroup;;
  user: User;
  profile: Profile = {};
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('wonderHumanUser'));
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('wonderHumanUser'))
    this.getProfile();
  }


  getProfile() {
    this.userService.getProfile().subscribe(
      (data: any) => {
        this.hasProfile = true;
        this.initForm(data)
      },
      (error) => {
        if (error.error.detail === 'El usuario no tiene perfil') {
          this.hasProfile = false;
          this.initForm();
        }
      }
    )
  }


  initForm(dataUser?) {
    // Build form
    this.profileForm = this.formBuilder.group({
      firstName: [(dataUser) ? dataUser.user.first_name : this.user.first_name, [
        Validators.required,
      ]],
      lastName: [(dataUser) ? dataUser.user.last_name : this.user.last_name, [
        Validators.required,
      ]],
      email: [(dataUser) ? dataUser.user.email : this.user.email, [
        Validators.required,
      ]],
      occupation: [(dataUser) ? dataUser.occupation : '', [
        Validators.required,
      ]],
      city: [(dataUser) ? dataUser.city : '', [
        Validators.required,
      ]],
      country: [(dataUser) ? dataUser.country : '', [
        Validators.required,
      ]],
      dateOfBirth: [(dataUser) ? dataUser.dateOfBirth : '', [
        Validators.required,
      ]],
      aboutYou: [(dataUser) ? dataUser.aboutYou : '', [
        Validators.required,
      ]],
    });
  }

  get f() { return this.profileForm.controls; }


  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    // if (this.profileForm.invalid) {
    //   this.spinner.hide();
    //   return;
    // }

    // Set object
    this.profile.firstName = this.profileForm.get('firstName').value;
    this.profile.lastName = this.profileForm.get('lastName').value;
    this.profile.email = this.profileForm.get('email').value;
    this.profile.occupation = this.profileForm.get('occupation').value;
    this.profile.city = this.profileForm.get('city').value;
    this.profile.country = this.profileForm.get('country').value;
    this.profile.dateOfBirth = this.profileForm.get('dateOfBirth').value;
    this.profile.aboutYou = this.profileForm.get('aboutYou').value;

    (this.hasProfile)? this.updateProfile(this.profile) : this.createProfile(this.profile);

  }



  createProfile(profile) {
    // Send request
    this.userService.newProfile(profile).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.toastr.success('Success', 'New Profile');
        this.router.navigateByUrl('/user-profile')
      },
      err => { console.log(err); this.toastr.error('Error', err.error.detail); this.spinner.hide(); }
    );
  }

  updateProfile(update) {
    this.userService.updateProfile(update).subscribe(
      (data: any) => {
        this.spinner.hide();
        this.toastr.success('Success', 'Update Profile');
        this.router.navigateByUrl('/user-profile')
      },
      err => { console.log(err); this.toastr.error('Error', err.error.detail); this.spinner.hide(); }
    );
  }

}
