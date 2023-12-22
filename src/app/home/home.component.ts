import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent,CommonModule],
  template: `
  <section>
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button>
    </form>
  </section>
  <section class="results">
    <app-housing-location *ngFor="let housingL of filterdLocationList"
     [housingLocation]="housingL">
      <!-- [Attribute] = Value-->
    </app-housing-location>
  </section>

`,

  styleUrl: './home.component.css'
})
export class HomeComponent {

  housingLocationList : HousingLocation[] = [];
  housingService : HousingService = inject(HousingService);

  filterdLocationList: HousingLocation[] = [];

  constructor(){
    this.housingLocationList = this.housingService.getAllHousingLocations();
    this.filterdLocationList = this.housingLocationList;
  }

  filterResults(text: string){
    if (!text) {
      this.filterdLocationList = this.housingLocationList;
      return;
    }

    this.filterdLocationList = this.housingLocationList.filter(housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase()));
  }
  
}

