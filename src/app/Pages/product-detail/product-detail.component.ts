import { Component, OnInit } from '@angular/core';
import {ImageGalleryPath, ImagePath} from '../../Utilities/PathTools';
import {Product} from '../../DTOs/Products/Product';
import {ProductsService} from '../../Services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductGallery} from '../../DTOs/Products/ProductGallery';
import {AuthService} from '../../Services/auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductCommentDTO} from '../../DTOs/Products/ProductCommentDTO';
import {CurrentUserDTO} from '../../DTOs/Account/CurrentUserDTO';
import {AddProductComment} from '../../DTOs/Products/AddProductComment';

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
  productComments: ProductCommentDTO[] = [];
  currentUser: CurrentUserDTO = null;
  commentForm: FormGroup;


  constructor(
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.isLoading = true;

    this.authService.getCurrentUser().subscribe(res => {
      if (res !== null) {
        this.currentUser = res;
      }
    });

    this.activatedRoute.params.subscribe(params => {
      const productId = params.productId;
      if (productId === undefined) {
        this.router.navigate(['']);
      }

      this.productService.getSingleProduct(productId).subscribe(res => {
        if (res.status === 'NotFound') {
          this.router.navigate(['']);
        } else if (res.status === 'Success') {
          this.product = res.data.product;
          this.galleries = res.data.galleries;
          this.mainImage = ImagePath + this.product.imageName;
        }
        this.productService.getRelatedProducts(productId).subscribe(result => {
          if (result.status === 'Success') {
            this.relatedProducts = result.data;
          }
        });
      });

      this.productService.getProductComments(productId).subscribe(res => {
        this.productComments = res.data;
      });

    });

    this.commentForm = new FormGroup({
      text: new FormControl(null, [
        Validators.required,
        Validators.maxLength(500)
      ])
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


  addComment() {
    if (this.commentForm.valid) {
      const comment = new AddProductComment(this.product.id, this.commentForm.controls.text.value);
      // add comment to database
      this.productService.addProductComment(comment).subscribe(res => {
        console.log(res.status);
        if (res.status === 'Success') {
          const commentDTO = res.data;
          commentDTO.userFullName = this.currentUser.firstName + ' ' + this.currentUser.lastName;
          this.productComments.unshift(commentDTO);
          this.commentForm.reset();
        }
      });
    }
  }


}
