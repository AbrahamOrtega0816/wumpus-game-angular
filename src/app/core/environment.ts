/**************************************************
 ** GAME ENVIRONMENT CLASS
 **************************************************/
import ArrayUtils from '../utils/array-utils';
import RandomUtils from '../utils/random-utils';
import Resources from './resources';

export default class Environment {
  i;
  j;
  width;
  height;
  removeWalls = false;
  visible: any = [];
  holes: any = [];
  wumpus: any = [];
  golds: any = [];
  level: any = {};

  private resources: Resources = new Resources();
  private randomUtils: RandomUtils = new RandomUtils();
  private arrayUtils: ArrayUtils = new ArrayUtils();

  constructor(params: any, width: number, height: number) {
    this.i = params.colums;
    this.j = params.rows;
    this.width = width;
    this.height = height;

    this.level = this.randomUtils.getRandomLevel(
      this.i,
      this.j,
      params.hole,
      params.wumpus,
      params.gold
    );
    this.restart();
  }

  restart() {
    this.visible = this.getMatrix(this.i, this.j);

    this.visible[0][0] = 1;

    this.golds = this.arrayUtils.copy(this.level.golds);
    this.holes = this.arrayUtils.copy(this.level.holes);
    this.wumpus = this.arrayUtils.copy(this.level.wumpus);
  }

  randomInitialization() {
    this.level = this.randomUtils.getRandomLevel(this.i, this.j);

    this.restart();
  }

  getMatrix(maxI: any, maxJ: any, initialValue = 0) {
    var initialValue = initialValue || 0;

    var matrix = new Array(maxI);

    for (var i = 0; i < maxI; i++) {
      matrix[i] = new Array(maxJ);

      for (var j = 0; j < maxJ; j++) {
        matrix[i][j] = initialValue;
      }
    }

    return matrix;
  }

  removeWumpus(deadWumpus: any) {
    this.visible[deadWumpus[0]][deadWumpus[1]] = 1;

    this.wumpus = this.arrayUtils.removeByValues(this.wumpus, [deadWumpus]);
  }

  removeGold(gold: any) {
    this.golds = this.arrayUtils.removeByValues(this.golds, [gold]);
  }

  contains(array: any, i: any, j: any) {
    return this.get(array, i, j) != false;
  }

  get(array: any, i: any, j: any) {
    return this.arrayUtils.search(array, [i, j]);
  }

  hasAWumpus(player: any) {
    for (let i = 0; i < this.wumpus.length; i++) {
      const wumpu = this.wumpus[i];

      if (wumpu[0] == player.getPosI() && wumpu[1] == player.getPosJ()) {
        return true;
      }
    }

    return false;
  }

  hasAHole(player: any) {
    for (let i = 0; i < this.holes.length; i++) {
      const hole = this.holes[i];

      if (hole[0] == player.getPosI() && hole[1] == player.getPosJ()) {
        return true;
      }
    }

    return false;
  }

  async draw(ctx: any) {
    const breeze = 'brisa';
    const stench = 'hedor';

    for (var i = 0; i < this.i; i++) {
      for (var j = 0; j < this.j; j++) {
        ctx.drawImage(
          this.resources.images['floor'],
          i * this.width,
          j * this.height,
          this.width,
          this.height
        );
      }
    }

    for (let i = 0; i < this.holes.length; i++) {
      const hole = this.holes[i];

      ctx.drawImage(
        this.resources.images['hole'],
        hole[0] * this.width,
        hole[1] * this.height,
        this.width,
        this.height
      );

      this.drawText(ctx, breeze, hole[0], hole[1] + 1, 3);
      this.drawText(ctx, breeze, hole[0], hole[1] - 1, 3);
      this.drawText(ctx, breeze, hole[0] + 1, hole[1], 3);
      this.drawText(ctx, breeze, hole[0] - 1, hole[1], 3);
    }

    for (let i = 0; i < this.wumpus.length; i++) {
      const wumpu = this.wumpus[i];

      ctx.drawImage(
        this.resources.images['wumpus'],
        wumpu[0] * this.width,
        wumpu[1] * this.height,
        this.width,
        this.height
      );

      this.drawText(ctx, stench, wumpu[0], wumpu[1] + 1, 14);
      this.drawText(ctx, stench, wumpu[0], wumpu[1] - 1, 14);
      this.drawText(ctx, stench, wumpu[0] + 1, wumpu[1], 14);
      this.drawText(ctx, stench, wumpu[0] - 1, wumpu[1], 14);
    }

    for (let i = 0; i < this.golds.length; i++) {
      const gold = this.golds[i];

      ctx.drawImage(
        this.resources.images['floor_gold'],
        gold[0] * this.width,
        gold[1] * this.height,
        this.width,
        this.height
      );
      ctx.drawImage(
        this.resources.images['gold'],
        gold[0] * this.width,
        gold[1] * this.height,
        this.width,
        this.height
      );
    }

    for (var i = 0; i < this.i; i++) {
      for (var j = 0; j < this.j; j++) {
        if (this.visible[i][j] == 0 && !this.removeWalls) {
          ctx.drawImage(
            this.resources.images['wall'],
            i * this.width,
            j * this.height,
            this.width,
            this.height
          );
        }
      }
    }

    // Draw horizontal lines
    for (let i = 1; i < this.i; i++) {
      this.drawLine(
        ctx,
        i * this.width,
        0,
        i * this.height,
        this.j * this.width
      );
    }
    // Draw vertical lines
    for (let j = 1; j < this.j; j++) {
      this.drawLine(
        ctx,
        0,
        j * this.height,
        this.i * this.width,
        j * this.height
      );
    }
  }

  drawText(ctx: any, text: any, i: any, j: any, offset: any) {
    ctx.font = '12px Verdana';
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'hanging';
    ctx.fillText(text, i * this.width + 2, j * this.height + offset);
  }

  drawLine(ctx: any, x0: any, y0: any, x1: any, y1: any) {
    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1.0;
    //ctx.translate(0.5, 0.5)
    ctx.moveTo(x0 + 0.5, y0 + 0.5);
    ctx.lineTo(x1 + 0.5, y1 + 0.5);
    ctx.stroke();
  }
}
