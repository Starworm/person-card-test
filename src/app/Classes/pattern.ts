import {Validators} from '@angular/forms';

export class Patterns {

  static phonePattern = Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[s\\./0-9]*$');

}
