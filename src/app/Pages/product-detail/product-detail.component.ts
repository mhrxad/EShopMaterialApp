import { Component, OnInit } from '@angular/core';
import {ImageGalleryPath, ImagePath} from '../../Utilities/PathTools';
import {Product} from '../../DTOs/Products/Product';
import {ProductsService} from '../../Services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductGallery} from '../../DTOs/Products/ProductGallery';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  isLoading = true;
  imagePath = ImagePath;
  imageGalleryPath = ImageGalleryPath;
  product: Product;
  galleries: ProductGallery[];
  mainImage: string;
  selectedImageId = 0;
  relatedProducts: Product[] = [];


  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.activatedRoute.params.subscribe(params => {
      const productId = params.productId;
      if (productId === undefined) {
        this.router.navigate(['']);
      }

      this.productService.getSingleProduct(productId).subscribe(res => {
        if (res.status === 'NotFound') {
          this.router.navigate(['']);
        } else if (res.status === 'Success') {
          console.log(res.data);
          this.product = res.data.product;
          this.galleries = res.data.galleries;
          this.mainImage = ImagePath + this.product.imageName;
        }
        this.productService.getRelatedProducts(productId).subscribe(result => {
          if (result.status === 'Success') {
            console.log(result.data);
            this.relatedProducts = result.data;
          }
        });
      });
    });
    this.isLoading = false;

  }

  selectImage(imageId: number) {
    this.selectedImageId = imageId;
    if (imageId !== 0) {
      const gallery = this.galleries.filter(g => g.id === imageId)[0];
      this.mainImage = this.imageGalleryPath + gallery.imageName;
    } else {
      this.mainImage = this.imagePath + this.product.imageName;
    }
  }


}
