import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/Address';
import { AddressbookserviceService } from 'src/app/services/addressbookservice.service';

@Component({
  selector: 'app-addressbookform',
  templateUrl: './addressbookform.component.html',
  styleUrls: ['./addressbookform.component.scss']
})
export class AddressbookformComponent implements OnInit {

  contact: Address = new Address();
  id: any;
  a: boolean = false;
  submitted = false;
  contactDetails!: FormGroup;
  isEdit: Boolean = false;
  contacts: any;

  constructor(
    private router:Router,
             private addressService:AddressbookserviceService,
              private route:ActivatedRoute,
              private formBuilder: FormBuilder
              ) { }

  ngOnInit(): void {
    this.contactDetails=this.formBuilder.group({
      name:['',Validators.compose([Validators.required, Validators.minLength(2),Validators.pattern('^[A-Z][a-zA-Z\\s]{2,}$')])],
      mobile:['',Validators.compose([Validators.required, Validators.pattern('^[1-9][0-9]{9}$')])],
      address:['',Validators.compose([Validators.required, Validators.minLength(5)])],                                                   
      city:['',Validators.required],
      state:['',Validators.required],
      zip:['',Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])]
    })

    this.route.params.subscribe(param =>{
      if (param && param.id) {
        this.addressService.getEmployee(param.id).subscribe((response: any) => {
          console.log(response);
          this.id = param.id;
          this.isEdit = true;
          this.contactDetails.controls['name'].setValue(response.data.name);
          this.contactDetails.controls['mobile'].setValue(response.data.mobile);
          this.contactDetails.controls['address'].setValue(response.data.address);
          this.contactDetails.controls['city'].setValue(response.data.city);
          this.contactDetails.controls['state'].setValue(response.data.state);
          this.contactDetails.controls['zip'].setValue(response.data.zip);
          });
        }
    })
  }

  newAddress():void{

  }

  onSubmit() {
    this.submitted = true;
    this.register();
  }

  register() {
    if(!this.isFormValid())
      return;
    var addressDto = {
      'name': this.contactDetails.controls['name'].value,
      'mobile': this.contactDetails.controls['mobile'].value,
      'address': this.contactDetails.controls['address'].value,
      'city': this.contactDetails.controls['city'].value,
      'state': this.contactDetails.controls['state'].value,
      'zip':this.contactDetails.controls['zip'].value
    };
    console.log("address dto in Register()", addressDto)
    this.addressService.createContact(addressDto).subscribe((response:any) => {
      this.router.navigate([""]);
      console.log("Response is ====> " + response);
    })
  }

  isFormValid(): boolean {
    if(this.contactDetails.controls['name'].valid &&
        this.contactDetails.controls['mobile'].valid &&
        this.contactDetails.controls['address'].valid &&
        this.contactDetails.controls['city'].valid &&
        this.contactDetails.controls['state'].valid &&
        this.contactDetails.controls['zip'].valid)
    return true;
    this.contactDetails.markAllAsTouched();
    console.log("Form validation is false");
    return false;
  }

  reset() {
    this.contactDetails.reset();
  }


  update() {
    this.id= Number.parseInt(this.id);
    console.log("update id ",this.id);
    var addressDto = {
      'id': Number.parseInt(this.id),
      'name': this.contactDetails.controls['name'].value,
      'mobile': this.contactDetails.controls['mobile'].value,
      'address': this.contactDetails.controls['address'].value,
      'city': this.contactDetails.controls['city'].value,
      'state': this.contactDetails.controls['state'].value,
      'zip': this.contactDetails.controls['zip'].value
    };
    console.log("employee dto in Update()", addressDto)

    if(this.isFormValid()) {
      this.addressService.updateEmployee(addressDto,this.id).subscribe((response: any) => {
        console.log("response is " + response);
        this.router.navigate(["/"]);
      })
    }
  }

}
