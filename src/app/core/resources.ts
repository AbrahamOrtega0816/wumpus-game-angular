import { Howl } from 'howler';

export default class Resources {

    musics:any;
    images:any;

    constructor(){
        this.load()
    }

    play(name: any, override = true){

        let sound = this.musics[name];

        if (sound){
            if(override){
                sound.play();
            } else {
                if(!sound.playing()) {
                    sound.play();
                }
            }
        }
    }

    stop(name: any){

        let sound = this.musics[name];

        if (sound && sound.playing()) {
            sound.stop();
            sound.unload();
        }
    }

	loadMusic(name: any, file: any){

        return new Promise((resolve, reject) => {

            let sound = new Howl({
                src: [file],
                html5: true,
                preload: true,
            });

            sound.once('load', function(){
                resolve([name, sound]);
            });
        });
	}

    loadImage(name: any, url: any){

       

        return new Promise((resolve, reject) => {

            var image = new Image();

            image.onload = function() {
                resolve([name, image]);
            };

            image.src = url;
        });
	}

    loadMusics(){

        return new Promise((resolve, reject) => {

            const files = [
                this.loadMusic("move", '../../assets/audio/bump.wav'),
                this.loadMusic("game-over", '../../assets/audio/game-over.wav'),
                this.loadMusic("win", '../../assets/audio/win.wav'),
                this.loadMusic("gold", '../../assets/audio/coin.wav'),
                this.loadMusic("arrow", '../../assets/audio/arrow.wav'),
                this.loadMusic("error", '../../assets/audio/error.mp3'),
                this.loadMusic("theme", '../../assets/audio/background.mp3'),
                this.loadMusic("dead-wumpus", '../../assets/audio/dead-wumpus.mp3'),
            ];

            Promise.all(files).then((result:any) => {
                resolve(["musics", Object.fromEntries(result)]);
            }).catch((error) => {
                reject(error);
            });
        });
	}

	loadImages(){

        return new Promise((resolve, reject) => {

            const files = [
                this.loadImage('facing_to_up', '../../assets/img/player_facing_to_up.png'),
                this.loadImage('facing_to_down', '../../assets/img/player_facing_to_down.png'),
                this.loadImage('facing_to_left', '../../assets/img/player_facing_to_left.png'),
                this.loadImage('facing_to_right', '../../assets/img/player_facing_to_right.png'),
                this.loadImage('wall', '../../assets/img/wall.png'),
                this.loadImage('floor', '../../assets/img/floor.png'),
                this.loadImage('hole', '../../assets/img/hole.png'),
                this.loadImage('wumpus', '../../assets/img/wumpus.png'),
                this.loadImage('gold', '../../assets/img/gold.png'),
                this.loadImage('floor_gold', '../../assets/img/floor_gold.png'),
            ];

            Promise.all(files).then((result:any) => {
                resolve(["images", Object.fromEntries(result)]);
            }).catch((error) => {
                reject(error);
            });
        });
	}

    load(){

        return new Promise((resolve, reject) => {

            const files = [
                this.loadImages(),
                this.loadMusics(),
            ];

            Promise.all(files).then((result:any) => {

                result = Object.fromEntries(result);

                this.images = result.images;
                this.musics = result.musics;

                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        });
    }
}
