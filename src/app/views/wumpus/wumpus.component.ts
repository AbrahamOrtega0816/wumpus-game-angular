import { Component,HostListener,ViewChild,ElementRef } from '@angular/core';
import Environment from '../../core/environment';
import Resources from 'src/app/core/resources';
import Player from 'src/app/core/player';
import Keys from 'src/app/core/keys';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-wumpus',
  templateUrl: './wumpus.component.html',
  styleUrls: ['./wumpus.component.scss'],
})
export class WumpusComponent {

  keys: any;
  env: any;
  isAlive: boolean = true;
  isFinished: boolean = false;
  isInit: boolean = false;
  player!: Player;
  resources: any;
  myForm!: FormGroup;
  score:any;
  arrow:any;
  golds:any;

  arrayUtils:any;

  @ViewChild('canvas',{static:true}) canvas! : ElementRef
  ctx!: CanvasRenderingContext2D;
  
  constructor() {
    this.keys = new Keys();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      colums: new FormControl('',[Validators.required,Validators.min(5)]),
      rows: new FormControl('',[Validators.required,Validators.min(5)]),
      arrow: new FormControl('',[Validators.required,Validators.min(1)]),
      gold: new FormControl('',[Validators.required,Validators.min(1)]),
      wumpus: new FormControl('',[Validators.required,Validators.min(1)]),
      hole: new FormControl('',[Validators.required,Validators.min(1)]),
    });
  }

  ngAfterViewInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.resources = new Resources();
    this.resources.stop('theme');
    // this.start();
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    this.keys.onKeyDown(event,this.isAlive,this.isFinished);
    this.animate();
  }

  start() {
    if (!this.env || !this.isInit){
      this.env = new Environment(this.myForm.value, 64, 64);
      this.resources.stop('theme');
    }

    this.player = new Player(this.env,0,0,this.myForm.value.arrow);

    this.resources.load().then(() => {
      this.resources.play('theme', false);

      this.restart();

      this.resizeCanvas();

      this.animate();
    });
  }

  restart() {
    if (!this.env) {
      this.env = new Environment(this.myForm.value, 64, 64);
    }

    // We need to create a new environment if it is the first time of the player won
    if (this.isFinished) {
      this.env = new Environment(this.myForm.value, 64, 64);
    } else {
      this.env.restart();
    }

    // $("#modal-win").modal("hide");
    // $("#modal-game-over").modal("hide");
    // $('#btn-remove-walls').prop('checked', false);

    this.resources.stop('game-over');
    this.resources.stop('win');
    this.resources.play('theme', false);

    this.isAlive = true;
    this.isFinished = false;
    this.animate();
  }
  // Browser window resize
  resizeCanvas() {
    this.canvas.nativeElement.width = this.env.width * this.env.i;
    this.canvas.nativeElement.height = this.env.height * this.env.j;
  }

  // Keyboard key down
  onKeydown(e: Event) {
    this.keys.onKeyDown(e);
    this.animate();
  }

  update() {
    if (this.player.update(this.keys)) {
      this.player.score -= 10;
    }

    var deadWumpus = this.player.kill(this.keys);

    if (deadWumpus) {
      this.player.score += 1000;
      this.env.removeWumpus(deadWumpus);
    }

    var capturedGold = this.player.capture(this.keys);

    if (capturedGold) {
      this.player.score += 1000;

      this.env.removeGold(capturedGold);

      this.resources.play('gold');

      if (this.env.golds.length == 0) {
        this.isFinished = true;
      }
    }

    if (this.env.hasAHole(this.player) || this.env.hasAWumpus(this.player)) {
      this.isAlive = false;
    }

    this.score = this.player.score
    this.arrow = this.player.arrow
    this.golds = this.env.golds.length

    if (!this.isAlive) {
      this.displayGameOver();
    }

    if (this.isFinished) {
      this.displayCongratulations();
    }
  }


  displayGameOver() {
    // $("#modal-game-over").modal("show");

    this.resources.play('game-over', false);
    this.resources.stop('theme');
  }

  displayCongratulations() {
    // $("#modal-win").modal("show");
    this.resources.play('win', false);
    this.resources.stop('theme');
  }

  async draw() {

    if (this.env) {
      await this.env.draw(this.ctx);
    }

    if (this.player) {
      await this.player.draw(this.ctx);
    }
  }

  animate() {
    this.update();
    this.draw();
  }

  loadEnvironment(hash: any) {
    var link = atob(hash.replace('#', ''));

    var obj = JSON.parse(link);

    this.env.holes = obj.holes;
    this.env.golds = obj.golds;
    this.env.wumpus = obj.wumpus;

    this.animate();
  }

  removeWalls(evt:any){
    this.env.removeWalls =  evt.target.checked;
    this.animate();
  }

  isNumberKey(evt:any)
  {
     var charCode = (evt.which) ? evt.which : evt.keyCode
     if (charCode > 31 && (charCode < 48 || charCode > 57))
        evt.preventDefault();

     return true;
  }  

}
