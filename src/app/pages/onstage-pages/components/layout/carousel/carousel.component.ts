import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carousel [ShowData]',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() ShowData: any;

  constructor(
  ) {
    console.log('constructor', this.ShowData);
  }

  ngOnInit(): void { console.log('ngOnInit', this.ShowData); }
  ngOnChanges() { console.log('ngOnChanges', this.ShowData); }
  ngDoCheck() { console.log('ngDoCheck', this.ShowData); }
  ngAfterContentInit() { console.log('ngAfterContentInit', this.ShowData); }
  ngAfterContentChecked() { console.log('ngAfterContentChecked', this.ShowData); }
  ngAfterViewInit() { console.log('ngAfterViewInit', this.ShowData); }
  ngAfterViewChecked() { console.log('ngAfterViewChecked', this.ShowData); }

  // images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/900/500`);

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', { static: true }) carousel: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
}
