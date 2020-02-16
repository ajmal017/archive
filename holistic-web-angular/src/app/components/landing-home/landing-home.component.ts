import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-home',
  templateUrl: './landing-home.component.html',
  styleUrls: ['./landing-home.component.scss']
})
export class LandingHomeComponent implements OnInit {

  public co: HTMLElement;
  private tick: any;
  private bounceCount: number;

  constructor() { 
  }

  ngOnInit() {
    this.co = document.getElementById('co');
    this.startAnimation();
  }

  startAnimation(){
    this.co.style.display = 'none';
    this.co.style.position = 'absolute';
    this.co.style.top = '-17vh';
    this.co.style.left = '0vw';
    this.co.style.display = 'block';
    this.startPhysics();
    setTimeout(clearInterval, 3150, this.tick);
    
  }

  startPhysics(){
    this.bounceCount = 0;
    let gravity = 0.08;
    let velocityY = 0;
    let friction = 0.00001;
    let velocityX = 0.275;
    let offset: any = parseFloat(this.co.style.top);
    let leftOffset: any = parseFloat(this.co.style.left);
    let frameDelay = 20;
    
    var bounce = function(that){
      console.log(`> velocityX: ${velocityX}, velocityY: ${velocityY}`);
      // if should do bounce: do bounce
      let bouncePoints = [-1, 6, 15]
      if (parseFloat(offset)+velocityY > bouncePoints[that.bounceCount]) {
        this.co.style.top = bouncePoints[that.bounceCount] +'vw';
        that.bounceCount ++;
        console.log("> bounce at: "+ offset)
        // if too slow too bounce then dont bounce anymore
        if (velocityY < 0.8 && velocityY > -0.8){
          return;
        }
        velocityY = -velocityY;
      }
      // if stopped sideways movement
      if (velocityX - friction < 0){
        velocityX = 0;
        friction = 0;
      }
      velocityX -= friction;
      velocityY += gravity;
      leftOffset = parseFloat(this.co.style.left.split('vw')[0]) + velocityX;
      this.co.style.left = leftOffset + 'vw';
      offset = parseFloat(this.co.style.top.split('vh')[0]) + velocityY;
      offset = offset + 'vh';
      this.co.style.top = offset.toString();
    }
    
    this.tick = setInterval(bounce, frameDelay, this);
  }


}
