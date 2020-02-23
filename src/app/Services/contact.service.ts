import {Injectable} from '@angular/core';
import {Contact} from '../Classes/contact';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Urls} from '../Classes/urls';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [
    new Contact(
      'Vasya',
      0,
      0,
      'Twitter',
      'New York',
      'Main str.',
      23,
      '(234)232-23-43',
      'Manager',
      '../../../../assets/img/alex jonathan.jpg'
    ),

    new Contact(
      'Masha',
      0,
      0,
      'Twitter',
      'New York',
      'Main str.',
      23,
      '(234)232-23-43',
      'Sales',
      '../../../../assets/img/janeth carton.jpg'
    ),

    new Contact(
      'Kolya',
      0,
      0,
      'Twitter',
      'New York',
      'Main str.',
      23,
      '(234)232-23-43',
      'Developer',
      '../../../../assets/img/michael zimber.jpg'
    ),

  ];
  contactChanged = new Subject<Contact[]>();

  token = '&key=AIzaSyBt8VZKJVlQpGnsYEfmqF0eJztsJem1v-Q';   // token for connect to GoogleMaps API
  coordinates: Observable<string>;

  constructor(private http: HttpClient) {
  }

  getCoordinates(token: string, address: string) {
    this.coordinates = this.http.get<string>(Urls.urlBase + address + token);
  }

  getContacts() {
    return this.contacts.slice();
  }

  getContact(index: number) {
    return this.contacts[index];
  }

  addContact(name: string,
             company: string,
             city: string,
             street: string,
             house: number,
             phone: string,
             position: string,
             coordLat: number,
             coordLon: number,
             photoPath: string) {

    this.contacts.push(new Contact(name, coordLat, coordLon, company, city, street, house, phone, position, photoPath));
    return this.contactChanged.next(this.contacts.slice());
  }

  updateContact(index: number,
                name: string,
                company: string,
                city: string,
                street: string,
                house: number,
                phone: string,
                position: string,
                coordLat: number,
                coordLon: number,
                photoPath: string) {

    this.contacts[index] = new Contact(name, coordLat, coordLon, company, city, street, house, phone, position, photoPath);
    return this.contactChanged.next(this.contacts.slice());

  }

  deleteContact(index: number) {
    this.contacts.splice(index, 1);
    this.contactChanged.next(this.contacts.slice());
  }
}
