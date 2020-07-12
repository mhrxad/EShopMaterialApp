import {Component, OnDestroy, OnInit} from '@angular/core';
import {FilterProductsDTO} from '../../DTOs/Products/FilterProductsDTO';
import {ProductCategory} from '../../DTOs/Products/ProductCategory';
import {ProductsService} from '../../Services/products.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductsOrderBy} from '../../DTOs/Products/ProductsOrderBy';
import {MediaObserver, MediaChange} from '@angular/flex-layout';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {


  filterProducts: FilterProductsDTO = new FilterProductsDTO(
    '', 0, 0, 1, 0, 0, 0, 6, 0, 1, null, [], []
  );
  isLoading = true;
  pages: number[] = [];
  categories: ProductCategory[] = [];
  sidenav = true;
  mediaSub: Subscription;
  deviceXs: boolean;

  constructor(
    private productsService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public mediaObserver: MediaObserver
  ) {
  }

  ngOnInit(): void {

    this.mediaSub = this.mediaObserver.media$.subscribe((result: MediaChange) => {
      this.deviceXs = result.mqAlias === 'xs' ? true : false;
    });

    this.activatedRoute.queryParams.subscribe(params => {
      let pageId = 1;
      if (params.pageId !== undefined) {
        pageId = parseInt(params.pageId, 0);
      }
      this.filterProducts.categories = params.categories ? params.categories : [];
      this.filterProducts.pageId = pageId;
      this.filterProducts.startPrice = params.startPrice ? params.startPrice : 0;
      this.filterProducts.endPrice = params.endPrice ? params.endPrice : 0;
      this.getProducts();
    });

    this.productsService.getProductActiveCategories().subscribe(res => {
      if (res.status === 'Success') {
        this.categories = res.data;
      }
    });
  }

  formatLabel(value: number) {
    if (value >= 1000000) {
      return Math.round(value / 1000000) + 'm';
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  setMinPrice(event: any) {
    this.filterProducts.startPrice = parseInt(event.value, 0);
  }

  setMaxPrice(event: any) {
    this.filterProducts.endPrice = parseInt(event.value, 0);
  }

  filterButton() {
    this.router.navigate(
      ['products'], {
        queryParams: {
          categories: this.filterProducts.categories,
          startPrice: this.filterProducts.startPrice,
          endPrice: this.filterProducts.endPrice
        }
      }
    );
  }

  changeOrder(event: any) {
    // console.log(event);
    // console.log(this.filterProducts);
    // this.getProducts();
    switch (event.value) {
      case ProductsOrderBy.PriceAsc.toString():
        this.router.navigate(['products'], {
          queryParams: {
            pageId: this.filterProducts.activePage,
            categories: this.filterProducts.categories,
            orderBy: 'priceAsc',
            startPrice: this.filterProducts.startPrice,
            endPrice: this.filterProducts.endPrice
          }
        });
        break;
      case ProductsOrderBy.PriceDes.toString():
        this.router.navigate(['products'], {
          queryParams: {
            pageId: this.filterProducts.activePage,
            categories: this.filterProducts.categories,
            orderBy: 'priceDes',
            startPrice: this.filterProducts.startPrice,
            endPrice: this.filterProducts.endPrice
          }
        });
        break;
    }
  }

  filterCategories(event: any) {
    const value = event.source.value;
    if (this.filterProducts.categories === undefined || this.filterProducts.categories === null) {
      this.filterProducts.categories = [];
    }
    if (event.checked) {
      this.filterProducts.categories.push(parseInt(value, 0));
      this.setCategoriesFilter();
    } else {
      this.filterProducts.categories = this.filterProducts.categories.filter(s => s !== parseInt(value, 0));
      this.setCategoriesFilter();
    }
  }

  setCategoriesFilter() {
    if (this.filterProducts.categories.length > 0) {
      this.router.navigate(['products'], {queryParams: {categories: this.filterProducts.categories}});
    } else {
      this.router.navigate(['products']);
    }
  }

  setPage(page: number) {
    this.router.navigate(['products'],
      {
        queryParams: {
          pageId: page,
          categories: this.filterProducts.categories,
          startPrice: this.filterProducts.startPrice,
          endPrice: this.filterProducts.endPrice
        }
      });
  }

  getProducts() {
    this.productsService.getFilteredProducts(this.filterProducts).subscribe(res => {
      this.isLoading = true;
      this.filterProducts = res.data;
      if (res.data.title === null) {
        this.filterProducts.title = '';
      }
      this.pages = [];
      if (res.data.categories === null) {
        this.filterProducts.categories = [];
      }

      for (let i = this.filterProducts.startPage; i <= this.filterProducts.endPage; i++) {
        this.pages.push(i);
      }
      this.isLoading = false;

    });
  }

  ngOnDestroy(): void {
    this.mediaSub.unsubscribe();
  }


}
