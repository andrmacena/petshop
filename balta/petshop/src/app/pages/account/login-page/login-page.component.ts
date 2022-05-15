import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { CustomValidator } from 'src/app/validators/custom.validator';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {

  public form!: FormGroup;
  public busy: boolean = false;

  constructor(private service: DataService, private fb: FormBuilder) {
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
    const token = localStorage.getItem('petshop.token');

    if (token) {
      this.busy = true;
      this.service.refreshToken().subscribe((data: any) => {
        localStorage.setItem('petshop.token', JSON.stringify(data.token))
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
      localStorage.setItem('petshop.token', JSON.stringify(data.token))
    });
  }
}
