import { HomelessService } from './../../core/services/homeless.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewHomeless } from 'src/app/shared/models/newHomeless';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-new-homeless',
  templateUrl: './new-homeless.component.html',
  styleUrls: ['./new-homeless.component.scss']
})
export class NewHomelessComponent implements OnInit {

  public newHomelessForm: FormGroup;
  public newHomeless: NewHomeless = {};
  public submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private router: Router,
    private homelessService: HomelessService
    ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm(){
    // Build form
    this.newHomelessForm = this.formBuilder.group({
      firstName: ['', [
        Validators.required,
      ]],
      lastName: ['', [
        Validators.required,
      ]],
      email: ['', [
        Validators.required,
      ]],
      occupation: ['', [
        Validators.required,
      ]],
      city: ['', [
        Validators.required,
      ]],
      country: ['', [
        Validators.required,
      ]],
      dateOfBirth: ['', [
        Validators.required,
      ]],
      aboutYou: ['', [
        Validators.required,
      ]],
    });
  }

  get f() { return this.newHomelessForm.controls; }


  onSubmit() {
    this.spinner.show();
    this.submitted = true;
    if (this.newHomelessForm.invalid) {
      this.spinner.hide();
      return;
    }

    console.log(this.newHomelessForm);

    // Set object
    this.newHomeless.firstName = this.newHomelessForm.get('firstName').value;
    this.newHomeless.lastName = this.newHomelessForm.get('lastName').value;
    this.newHomeless.email = this.newHomelessForm.get('email').value;
    this.newHomeless.occupation = this.newHomelessForm.get('occupation').value;
    this.newHomeless.city = this.newHomelessForm.get('city').value;
    this.newHomeless.country = this.newHomelessForm.get('country').value;
    this.newHomeless.dateOfBirth = new Date(this.newHomelessForm.get('dateOfBirth').value);
    this.newHomeless.aboutYou = this.newHomelessForm.get('aboutYou').value;


    console.log(this.newHomeless);
    // Send request
    this.homelessService.newHomeless(this.newHomeless).subscribe(
      (data: any) => {
        console.log(data);
        this.spinner.hide();
        this.toastr.success('Welcome', 'Registro satisfactorio');
      },
      err => {console.log(err); this.toastr.error('Error', err.error.detail); this.spinner.hide();}
    );
  }

}
