export default class Keys {
  up;
  left;
  right;
  down;
  space;
  enter;

  constructor(
    up: any = false,
    left: any = false,
    right: any = false,
    down: any = false,
    space: any = false,
    enter: any = false
  ) {
    (this.up = up || false),
    (this.left = left || false),
    (this.right = right || false),
    (this.down = down || false);
    this.space = space || false;
    this.enter = enter || false;
  }

  onKeyDown(e: any,isAlive:boolean,isFinished:boolean) {
    if(!isAlive || isFinished){
    	return;
    }

    var that = this,
      c = e.keyCode;

    switch (c) {
      // Controls
      case 37: // Left
        that.left = true;
        break;
      case 38: // Up
        that.up = true;
        break;
      case 39: // Right
        that.right = true; // Will take priority over the left key
        break;
      case 40: // Down
        that.down = true;
        break;
      case 32: // Space
        that.space = true;
        break;
      case 13: // enter
        that.enter = true;
        break;
    }
  }

  onKeyUp(e: any) {
    var that = this,
      c = e.keyCode;
    switch (c) {
      case 37: // Left
        that.left = true;
        break;
      case 38: // Up
        that.up = true;
        break;
      case 39: // Right
        that.right = true;
        break;
      case 40: // Down
        that.down = true;
        break;
      case 32: // Space
        that.space = true;
        break;
      case 13: // enter
        that.enter = true;
        break;
    }
  }
}
