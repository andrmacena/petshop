import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Security } from 'src/app/utils/security.util';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup;
  public busy: boolean = false;

  constructor(private service: DataService, private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      username: ['', Validators.compose([
        Validators.minLength(14),
        Validators.maxLength(14),
        Validators.required,
        CustomValidator.isCpf()
      ])],
      password: ['', Validators.compose([
        Validators.minLength(6),
        Validators.maxLength(20),
        Validators.required
      ])]
    })

  }

  ngOnInit(): void {
    const token = Security.getToken();

    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe((data: any) => {
        this.setUser(data.customer, data.token)
        this.busy = false;
      });
    } else {
      localStorage.clear();
      this.busy = false;
    }
  }

  submit() {
    this.busy = true;
    this.service.authenticate(this.form.value).subscribe((data: any) => {
      this.busy = false;
      this.setUser(data.customer, data.token)
    });
  }

  setUser(user: any, token: string) {
    Security.set(user, token);
    this.router.navigate(['/'])
  }
}
