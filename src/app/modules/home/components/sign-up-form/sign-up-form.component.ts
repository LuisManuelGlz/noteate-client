import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { MustMatch } from 'src/app/shared/utils/validators/must-match.validator';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.css'],
})
export class SignUpFormComponent implements OnInit {
  isLoading = false;
  signUpForm = new FormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password1: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      password2: new FormControl('', [Validators.required]),
    },
    { validators: MustMatch('password1', 'password2') }
  );

  constructor(private authService: AuthService, private router: Router) {}

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
    this.isLoading = true;
    this.authService.signUp(this.signUpForm.value).subscribe(
      () => {
        console.log('Sign up successful');
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.isLoading = false;
        this.router.navigate(['/notes']);
      }
    );
  }
}
