import {Product} from './Product';
import {ProductGallery} from './ProductGallery';

export class ProductDetailDTO {
  constructor(
    public product: Product,
    public galleries: ProductGallery[]
  ) {
  }
}
