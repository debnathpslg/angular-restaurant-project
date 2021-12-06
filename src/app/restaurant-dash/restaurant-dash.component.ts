import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurant.model';

@Component({
  selector: 'app-restaurant-dash',
  templateUrl: './restaurant-dash.component.html',
  styleUrls: ['./restaurant-dash.component.css'],
})
export class RestaurantDashComponent implements OnInit {
  formValue!: FormGroup;
  restaurantModelObj: RestaurantData = new RestaurantData();
  allRestaurantData: any;
  showAddBtn!: boolean;
  showEditBtn!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: [''],
    });

    this.getAllData();
  }

  clickAddResto() {
    this.formValue.reset();
    this.showAddBtn = true;
    this.showEditBtn = false;
  }

  clickEditResto() {
    this.formValue.reset();
    this.showAddBtn = false;
    this.showEditBtn = true;
  }

  addResto() {
    this.showAddBtn = true;
    this.showEditBtn = false;

    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurantModelObj).subscribe((res) => {
      alert('Restaurant record added successfully...');

      let ref = document.getElementById('clear');
      ref?.click();

      this.formValue.reset;
      this.getAllData();
    }),
      (err: any) => {
        alert('Something went wrong !!!');
      };
  }

  getAllData() {
    this.api.getRestaurant().subscribe((res) => {
      this.allRestaurantData = res;
    });
  }

  deleteResto(data: any) {
    if (confirm('Do you want to delete ' + data.name)) {
      this.api.deleteRestaurant(data.id).subscribe((res) => {
        alert(data.name + ' deleted successfully');

        this.getAllData();
      });
    }
  }

  onEditResto(data: any) {
    this.showAddBtn = false;
    this.showEditBtn = true;

    this.restaurantModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateResto() {
    this.restaurantModelObj.name = this.formValue.value.name;
    this.restaurantModelObj.email = this.formValue.value.email;
    this.restaurantModelObj.mobile = this.formValue.value.mobile;
    this.restaurantModelObj.address = this.formValue.value.address;
    this.restaurantModelObj.services = this.formValue.value.services;

    this.api
      .updateRestaurant(this.restaurantModelObj, this.restaurantModelObj.id)
      .subscribe((res) => {
        alert(this.restaurantModelObj.name + ' updated succeddfully...');

        let ref = document.getElementById('clear');
        ref?.click();

        this.formValue.reset;
        this.getAllData();
      });
  }
}
