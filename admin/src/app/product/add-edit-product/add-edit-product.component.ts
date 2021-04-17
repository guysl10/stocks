import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {eFormItemType, IFormItem} from 'src/app/shared/shared/form.types';
import {ProductService} from '../shared/product-service';
import {pick} from 'lodash';
import {PRODUCT_COLORS, PRODUCT_SIZES} from '../../shared/shared/constants';

@Component({
  selector: "app-add-edit-product",
  templateUrl: "./add-edit-product.component.html"
})
export class AddEditProductComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private productService: ProductService) {
  }

  isFormSubmitted = false;
  isEdit = false;
  isLoading = false;
  productId;
  productFormGroup: FormGroup = this.formBuilder.group({});
  productFormItems: Array<IFormItem> = [
    {label: 'Name', name: 'name', type: eFormItemType.TEXT, required: true},
    {
      label: 'Price',
      name: 'price',
      type: eFormItemType.TEXT,
      required: true,
      pattern: new RegExp(/-?[0-9]\d*(\.\d+)?/)
    },
    {
      label: 'Color',
      name: 'color',
      type: eFormItemType.SELECT,
      required: true,
      options: PRODUCT_COLORS.map((color) => ({value: color, label: color}))
    },
    {
      label: 'Size',
      name: 'size',
      type: eFormItemType.SELECT,
      required: true,
      options: PRODUCT_SIZES.map((size) => ({value: size, label: size}))
    },
    {label: 'Short Description', name: 'shortDescription', type: eFormItemType.TEXTAREA, required: true},
    {label: 'Long Description', name: 'longDescription', type: eFormItemType.TEXTAREA, required: true},
    {label: 'Home Product', name: 'isHomePageProduct', type: eFormItemType.CHECKBOX, required: true},
    {
      label: 'Product Image', name: 'imageUrl', type: eFormItemType.TEXT, required: true,
      pattern: new RegExp(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)
    },
  ];

  ngOnInit() {
    this.isEdit = this.route.snapshot.params.productId;
    if (this.isEdit) {
      this.productId = this.route.snapshot.data.product._id;
      setTimeout(() => {
        const productFormValue = pick(this.route.snapshot.data.product, ['name', 'isHomePageProduct', 'price', 'color', 'size', 'shortDescription', 'longDescription', 'imageUrl']);
        this.productFormGroup.setValue(productFormValue);
      }, 200);
    }
  }

  async addEditProduct() {
    this.isFormSubmitted = true;
    if (this.isLoading || !this.productFormGroup.valid) {
      return;
    }
    try {
      this.isLoading = true;
      const productData = this.productFormGroup.value;
      if (!this.isEdit) {
        await this.productService.addProduct(productData);
      } else {
        await this.productService.updateProduct(this.productId, productData);
      }
      await this.router.navigateByUrl('/products');
    } catch (e) {
      console.error(e);
    } finally {
      this.isLoading = false;
    }
  }
}
