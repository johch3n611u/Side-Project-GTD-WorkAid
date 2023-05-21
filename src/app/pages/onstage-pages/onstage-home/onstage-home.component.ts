import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { TweenMax, gsap, TweenLite } from "gsap";
import { delay } from 'rxjs/operators';
import { NipponColorHelperService } from 'src/app/shared/common/nippon-color-helper/nippon-color-helper.service';

@Component({
  selector: 'app-onstage-home',
  templateUrl: './onstage-home.component.html',
  styleUrls: ['./onstage-home.component.css']
})
export class OnstageHomeComponent implements OnInit {

  RandomColor: any = new Array(3);
  RanNum: string[];

  constructor(
    private NipponColorHelper: NipponColorHelperService,
  ) {
    this.RanNum = ['block', 'block', 'block'];
  }

  ngOnInit(): void {
    this.NipponColorHelper.SharedNipponColors.subscribe(res => this.RandomColor = res);
  }

  // https://greensock.com/get-started/
  // 中文文檔 https://www.tweenmax.com.cn/
  // 技巧：最快的方式應該是先把圖的初始幀的屬性搞定，然後再確定結束或是動畫中間會停滯的幀的屬性，然後再用 google dev 模式調整
  // 原理：每一條 timeline 都是各自獨立的，所以如果不同物件想在同個 timeline 做動就需要兩條 timeline。
  ngAfterViewInit(): void {
    console.log('gsap', gsap);
    this.RandomAnimation();
    setInterval(() => {
      this.RandomAnimation();
    }, 15000);
  }

  RandomAnimation() {
    let Case = this.NipponColorHelper.GetRandom(1, 3);
    // Case = 0; // Debug
    switch (Case) {
      case 1:
        this.Part1Animation();
        this.RanNum[0] = 'block';
        this.RanNum[1] = 'none';
        this.RanNum[2] = 'none';
        break;
      case 2:
        this.Part2Animation();
        this.RanNum[0] = 'none';
        this.RanNum[1] = 'block';
        this.RanNum[2] = 'none';
        break;
      case 3:
        this.Part3Animation();
        this.RanNum[0] = 'none';
        this.RanNum[1] = 'none';
        this.RanNum[2] = 'block';
        break;
      case 0: // Debug
        this.RanNum[0] = 'block';
        this.RanNum[1] = 'block';
        this.RanNum[2] = 'block';
        break;
    }
  }

  @ViewChild("Img1") private _Img1: ElementRef;
  @ViewChild("Img2") private _Img2: ElementRef;
  @ViewChild("Img3") private _Img3: ElementRef;
  @ViewChild("Img4") private _Img4: ElementRef;

  Part1Animation() {
    // {repeat:2, repeatDelay: 1}
    var tl = gsap.timeline();
    var tl2 = gsap.timeline();
    var tl3 = gsap.timeline();
    var tl4 = gsap.timeline();
    tl.to(this._Img2.nativeElement, { duration: 2, x: 634, y: 57, opacity: 1, ease: "bounce" });
    tl.to(this._Img3.nativeElement, { duration: 2, x: 276, y: 290, opacity: 1, ease: "bounce" });
    tl.to(this._Img4.nativeElement, { duration: 2, x: 178, y: 77, opacity: 1, ease: "bounce" });
    tl2.to(this._Img2.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl3.to(this._Img3.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl4.to(this._Img4.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl.to(this._Img1.nativeElement, { duration: 2, x: 430, y: 255, opacity: 1, scale: 1.7, ease: "bounce", delay: 2 });
  }

  @ViewChild("Img5") private _Img5: ElementRef;
  @ViewChild("Img6") private _Img6: ElementRef;
  @ViewChild("Img7") private _Img7: ElementRef;
  @ViewChild("Img8") private _Img8: ElementRef;
  @ViewChild("Img9") private _Img9: ElementRef;
  @ViewChild("Img10") private _Img10: ElementRef;
  @ViewChild("Img11") private _Img11: ElementRef;

  Part2Animation() {
    var tl = gsap.timeline();
    var tl8 = gsap.timeline();
    var tl2 = gsap.timeline();
    var tl3 = gsap.timeline();
    var tl4 = gsap.timeline();
    var tl5 = gsap.timeline();
    var tl6 = gsap.timeline();
    var tl7 = gsap.timeline();
    tl.to(this._Img5.nativeElement, { duration: 2, x: 30, y: -20, opacity: 1, ease: "bounce" });
    tl.to(this._Img6.nativeElement, { duration: 2, x: -4, y: -34, opacity: 1, ease: "bounce" });
    tl.to(this._Img8.nativeElement, { duration: 2, x: 36, y: -21, opacity: 1, ease: "bounce" });
    tl8.to(this._Img7.nativeElement, { duration: 2, x: 178, y: -3, opacity: 1, ease: "bounce" });
    tl8.to(this._Img9.nativeElement, { duration: 2, x: 172, y: -3, opacity: 1, ease: "bounce" });
    tl8.to(this._Img10.nativeElement, { duration: 2, x: 56, y: 33, opacity: 1, ease: "bounce" });
    tl2.to(this._Img5.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl3.to(this._Img6.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl4.to(this._Img7.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl5.to(this._Img8.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl6.to(this._Img9.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl7.to(this._Img10.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl.to(this._Img11.nativeElement, { duration: 2, x: 281, y: 131, opacity: 1, scale: 1, ease: "bounce", delay: 2 });
  }

  @ViewChild("Img12") private _Img12: ElementRef;
  @ViewChild("Img13") private _Img13: ElementRef;
  @ViewChild("Img14") private _Img14: ElementRef;
  @ViewChild("Img15") private _Img15: ElementRef;
  @ViewChild("Img16") private _Img16: ElementRef;
  @ViewChild("Img17") private _Img17: ElementRef;
  @ViewChild("Img18") private _Img18: ElementRef;
  @ViewChild("Img19") private _Img19: ElementRef;

  Part3Animation() {
    var tl = gsap.timeline();
    var tl8 = gsap.timeline();
    var tl2 = gsap.timeline();
    var tl3 = gsap.timeline();
    var tl4 = gsap.timeline();
    var tl5 = gsap.timeline();
    var tl6 = gsap.timeline();
    var tl7 = gsap.timeline();
    var tl9 = gsap.timeline();
    var tl10 = gsap.timeline();

    tl8.to(this._Img15.nativeElement, { duration: 2, x: 93, y: -3, opacity: 1, ease: "bounce" });
    tl.to(this._Img16.nativeElement, { duration: 2, x: -9, y: -3, opacity: 1, ease: "bounce" });
    tl.to(this._Img17.nativeElement, { duration: 2, x: -16, y: -5, opacity: 1, ease: "bounce" });
    tl.to(this._Img12.nativeElement, { duration: 2, x: 30, y: -20, opacity: 1, ease: "bounce" });
    tl8.to(this._Img13.nativeElement, { duration: 2, x: -4, y: -34, opacity: 1, ease: "bounce" });
    tl8.to(this._Img14.nativeElement, { duration: 2, x: 36, y: -21, opacity: 1, ease: "bounce" });
    tl2.to(this._Img12.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl3.to(this._Img13.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl4.to(this._Img14.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl5.to(this._Img15.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl6.to(this._Img16.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl7.to(this._Img17.nativeElement, { duration: 2, opacity: 0.2, delay: 7 });
    tl9.to(this._Img18.nativeElement, { rotate: -15, duration: 2, x: 220, y: 189, opacity: 1, scale: 1, ease: "bounce", delay: 9 });
    tl10.to(this._Img19.nativeElement, { rotate: 10, duration: 2, x: 379, y: 93, opacity: 1, scale: 1, ease: "bounce", delay: 9 });
  }

  // https://stackoverflow.com/questions/39743915/angular-2-scroll-event-not-firing/44869326
  // https://codepen.io/bassta/pen/kDvmC?editors=0010
  // https://greensock.com/scrolltoplugin/
  // https://stackoverflow.com/questions/44337691/how-to-test-a-directive-with-a-mouse-wheel-event-in-angular-2-4/44338419
  // https://www.itread01.com/p/662521.html
  // 暫時想不出解法
  @HostListener('mousewheel', ['$event']) EvenntHandler(event: any) {
    console.clear();
    // console.log('event', event);
    // console.log('window', window);
    // console.log('document', document);
    // console.log('window.pageYOffset', window.pageYOffset);
    // console.log('window.innerHeight', window.innerHeight);
    // console.log('window.outerHeight', window.outerHeight);
    // console.log('event.wheelDelta', event.wheelDelta);
    if (event.wheelDelta > 0) { // 往上滾
      // gsap.to(window, { duration: 2, scrollTo: 400 });
      // console.log('-', window.pageYOffset - window.innerHeight);
      // this.TempNowBoxNum = this.TempNowBoxNum - 1;
      // console.log(this.TempNowBoxNum);
      // this.TempNowBoxY = this.TempNowBoxY - (this.TempNowBoxNum * window.innerHeight);
      // this.TempNowBoxY = this.TempNowBoxY - event.wheelDelta;
      // console.log('-', this.TempNowBoxY);
      // window.scrollTo(0, this.TempNowBoxY);
    }
    if (event.wheelDelta < 0) { // 往下滾
      // gsap.to(window, { duration: 2, scrollTo: 800 });
      // console.log('+', window.pageYOffset + window.innerHeight);
      // window.scrollTo(0, 696);
    }
  }


  test() {
    window.scrollTo(0, 4368);
  }
}

