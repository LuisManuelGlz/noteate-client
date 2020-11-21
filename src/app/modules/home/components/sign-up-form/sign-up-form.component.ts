import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MustMatch } from 'src/app/core/utils/validators';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent implements OnInit {
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl('', [
        Validators.required,
      ]),
    },
    { validators: MustMatch('password1', 'password2') }
  );

  constructor() {}

  ngOnInit(): void {}

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password1() {
    return this.signUpForm.get('password1');
  }

  get password2() {
    return this.signUpForm.get('password2');
  }

  onSubmit() {
    console.log(this.signUpForm.value);
  }
}
