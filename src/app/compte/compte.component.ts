import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BackEndService } from '../service/back-end.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent implements OnInit {

  form: FormGroup;
  loading: boolean = false;

  book: any = {
    base64ImageEncoded: "",
    name: ""
  };

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder, private backendService: BackEndService) {
    this.createForm();
  }



  ngOnInit() {
  }


  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      avatar: null
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          base64ImageEncoded: reader.result.split(',')[1]
        })
      };
    }
  }

  onSubmit() {
    this.book.base64ImageEncoded = this.form.get('avatar').value.base64ImageEncoded;
    this.book.name = this.form.get('name').value;
    this.loading = true;

    this.backendService.add(this.book).subscribe(
      data => {
        this.backendService.handleData(data);
        if (data.payload) {
          console.log(data.payload);
          //cache the logged member in datashare service

          //navigate to home and display navbar or the hidden tabs
          //this.router.navigate(['/home']);

        }
      },
      error => {
        console.error(error.message);
        /* this.messageService.displayErrorMessage(error.message); */
      }

    );;


  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
