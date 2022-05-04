import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  generatedPassword = '';
  error = '';
  success = '';
  showPassword = false;
  password = {
    length: 8,
    alphabets: false,
    numbers: false,
    specialChars: false,
  };

  copyToClipboard(value: string) {
    navigator.clipboard.writeText(value);
    this.success = 'The password is copied to clipboard';
    setTimeout(() => {
      this.success = '';
    }, 1200);
  }

  generatePassword() {
    this.error = '';
    if (this.password.length > 0) {
      let generatedPassword = '';
      let allCharSet =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
      let alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      let numbers = '0123456789';
      let specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

      let len = this.password.length;

      if (this.password.alphabets) {
        generatedPassword += alphabets.charAt(
          Math.floor(Math.random() * alphabets.length)
        );
        len--;
      }
      if (this.password.numbers) {
        if (len > 0) {
          generatedPassword += numbers.charAt(
            Math.floor(Math.random() * numbers.length)
          );
          len--;
        } else {
          this.error =
            'Password is not long enough to include number as compulsary';
          return;
        }
      }
      if (this.password.specialChars) {
        if (len > 0) {
          generatedPassword += specialChars.charAt(
            Math.floor(Math.random() * specialChars.length)
          );
          len--;
        } else {
          this.error =
            'Password is not long enough to include special character as compulsary';
          return;
        }
      }

      for (let i = 0; i < len; ++i) {
        generatedPassword += allCharSet.charAt(
          Math.floor(Math.random() * allCharSet.length)
        );
      }

      let shuffle = [...generatedPassword];
      shuffle.forEach((elem, i, arr) => {
        let j = Math.floor(Math.random() * (len - i) + i);
        let k = arr[i];
        arr[i] = arr[j];
        arr[j] = k;
      });

      this.generatedPassword = shuffle.join('');
      this.copyToClipboard(shuffle.join(''));
    } else {
      this.error = 'Password cannot be of size less than 1';
    }
  }
}
