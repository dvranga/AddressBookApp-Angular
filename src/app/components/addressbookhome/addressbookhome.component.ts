import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressbookserviceService } from 'src/app/services/addressbookservice.service';

@Component({
  selector: 'app-addressbookhome',
  templateUrl: './addressbookhome.component.html',
  styleUrls: ['./addressbookhome.component.scss']
})
export class AddressbookhomeComponent implements OnInit {

  displayedColumns: string[] = ['name', 'mobile', 'address', 'city', 'state', 'zip', 'id'];
  contacts: any;
  numberOfContacts:any;

  constructor(
             private router:Router,
             private addressService:AddressbookserviceService,
              ) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.addressService.getEmployeeList().subscribe((response:any)=>{
      this.numberOfContacts=response.data.length;
      console.log("Response is ====> ",response.data.length)
      console.log("Response is ====> ",response)
       this.contacts = response.data;
      console.log(this.contacts)
    })
  }

  deleteContact(id: any) {
    console.log(id);
    this.addressService.deleteEmployee(id)
      .subscribe((response:any) => {
        console.log("Response is ",response)
        this.reloadData();
    })
  }

}
