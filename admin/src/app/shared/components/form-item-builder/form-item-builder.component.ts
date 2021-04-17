import {Component, Input, OnInit} from "@angular/core";
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {eFormItemType, IFormItem} from '../../shared/form.types';

@Component({
  selector: "app-form-item-builder",
  templateUrl: "./form-item-builder.component.html",
  styleUrls: ['./form-item-builder.component.scss']
})
export class FormComponent implements OnInit {
  @Input() formGroup: FormGroup;
  @Input() isFormSubmitted: boolean;
  @Input() fullWidthControls: boolean
  @Input() formItems: Array<IFormItem> = [];

  ngOnInit() {
    this.processFormItems();
    this.setFormGroupDataFromFormItems();
  }

  processFormItems() {
    this.formItems.forEach((formItem) => {
      formItem.placeholder = formItem.placeholder || formItem.label;
    })
  }

  setFormGroupDataFromFormItems() {
    this.formItems.forEach((formItem) => {
      const validators = [];
      if (formItem.required) {
        validators.push(Validators.required);
      }
      if (formItem.type === eFormItemType.EMAIL) {
        validators.push(Validators.email);
      }
      if (formItem.pattern) {
        validators.push(Validators.pattern(formItem.pattern));
      }
      this.formGroup.addControl(formItem.name, new FormControl('', validators));
    });
  }
}
