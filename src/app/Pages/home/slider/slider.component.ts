import {Component, OnInit, ViewChild} from '@angular/core';
import {NgImageSliderComponent} from 'ng-image-slider';
import {SliderService} from 'src/app/Services/slider.service';
import {Slider} from '../../../DTOs/Sliders/Slider';

@Component({
  selector: 'app-home-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @ViewChild('nav') slider: NgImageSliderComponent;
  public sliders: Slider[] = [];
  isLoading = true;
  imagesize: object = {width: '100%', height: '480px', space: 4};

  constructor(
    private sliderService: SliderService
  ) {
  }

  imageObject: Array<object> = [
    {
      image: 'assets/images/slide-1.jpg',
      thumbImage: 'assets/images/slide-1.jpg',
      alt: '',
      title: 'عنوان تصویر اول'
    },
    {
      image: 'assets/images/slide-2.jpg',
      thumbImage: 'assets/images/slide-2.jpg',
      alt: '',
      title: 'عنوان تصویر دوم'
    },
    {
      image: 'assets/images/slide-3.jpg',
      thumbImage: 'assets/images/slide-3.jpg',
      alt: '',
      title: 'عنوان تصویر سوم'
    },
    {
      image: 'assets/images/slide-4.jpg',
      thumbImage: 'assets/images/slide-4.jpg',
      alt: '',
      title: 'عنوان تصویر چهارم'
    }
  ];

  ngOnInit(): void {
    this.sliderService.getCurrentSliders().subscribe(sliders => {
      if (sliders === null) {
        this.sliderService.GetSliders().subscribe(res => {
          if (res.status === 'Success') {
            this.sliderService.setCurrentSliders(res.data);
          }
        });
      } else {
        this.sliders = sliders;
      }
    });

  }

  prevImageClick() {
    this.slider.prev();
  }

  nextImageClick() {
    this.slider.next();
  }


}
