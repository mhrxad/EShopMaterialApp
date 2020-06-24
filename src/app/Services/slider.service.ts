import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Slider} from '../DTOs/Sliders/Slider';
import {HttpClient} from '@angular/common/http';
import {IHomeSliderResponse} from '../DTOs/Sliders/HomeSliderResponse';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  private homeSliders: BehaviorSubject<Slider[]> = new BehaviorSubject<Slider[]>(null);

  constructor(
    private http: HttpClient
  ) { }


  public GetSliders(): Observable<IHomeSliderResponse> {
    return this.http.get<IHomeSliderResponse>('/slider/GetActiveSliders');
  }

  public getCurrentSliders(): Observable<Slider[]> {
    return this.homeSliders;
  }

  public setCurrentSliders(sliders: Slider[]) {
    this.homeSliders.next(sliders);
  }


}
