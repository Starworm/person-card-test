export class Contact {

  name: string;
  company: string;
  position: string;
  coordLat: number;
  coordLon: number;
  city: string;
  street: string;
  house: number;
  phone: string;
  photoPath: string;

  constructor(name: string,
              coordLat: number,
              coordLon: number,
              company: string,
              city: string,
              street: string,
              house: number,
              phone: string,
              position: string,
              photoPath: string) {
    this.name = name;
    this.company = company;
    this.position = position;
    this.coordLat = coordLat;
    this.coordLon = coordLon;
    this.city = city;
    this.street = street;
    this.house = house;
    this.phone = phone;
    this.photoPath = photoPath;
  }

}
