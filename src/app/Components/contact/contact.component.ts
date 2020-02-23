import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ContactService} from '../../Services/contact.service';
import {Subscription} from 'rxjs';
import {Patterns} from '../../Classes/pattern';
import {ErrorMatcher} from '../../Classes/error-matcher';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  id: number;
  form: FormGroup;
  isEditMode = false;
  coordLat;
  coordLon;
  photoPath = '../../../../assets/img/john-smith.jpg';

  subscript: Subscription;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactService: ContactService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];

    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
      });

    let name = '';
    let company = '';
    let city = '';
    let street = '';
    let house = 0;
    let phone = '';
    let position = '';

    const person = this.contactService.getContact(this.id);
    this.isEditMode = !!person;

    if (this.isEditMode) {
      name = person.name;
      company = person.company;
      city = person.city;
      street = person.street;
      house = person.house;
      phone = person.phone;
      position = person.position;
      this.photoPath = person.photoPath;
    }

    this.form = new FormGroup({
      name: new FormControl(name),
      company: new FormControl(company),
      city: new FormControl(city),
      street: new FormControl(street),
      house: new FormControl(house),
      phone: new FormControl(phone, [Patterns.phonePattern]),
      position: new FormControl(position)
    });
  }

  onSubmit() {

    this.contactService.getCoordinates(
      this.contactService.token,
      this.form.value['city'] + '+' +
      this.form.value['house'] + '+' +
      this.form.value['street']);

    this.subscript = this.contactService.coordinates
      .subscribe(res => {
        console.log(res);
        this.coordLat = Math.round(res['results'][0]['geometry']['location']['lat']);
        this.coordLon = Math.round(res['results'][0]['geometry']['location']['lng']);

        if (this.isEditMode) {
          this.contactService.updateContact(this.id, this.form.value['name'], this.form.value['company'],
            this.form.value['city'], this.form.value['street'], this.form.value['house'], this.form.value['phone'],
            this.form.value['position'], this.coordLat, this.coordLon, this.photoPath);
        } else {
          this.contactService.addContact(this.form.value.name, this.form.value.company, this.form.value.city,
            this.form.value.street, this.form.value.house, this.form.value.phone, this.form.value.position, this.coordLat,
            this.coordLon, this.photoPath);
        }

      });
    this.goBack();
  }

  reset() {
    this.form.reset();
  }

  goBack() {
    this.router.navigate(['']);
  }
}
