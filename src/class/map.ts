import { Vec2 } from "./vec2.js";

export class Map {

    tile: number[];
    sprite: number[];
    width: number;
    height: number;
    start: Vec2 = new Vec2();
    end: Vec2 = new Vec2();

    constructor(map: any) {
        this.width = map.header.width;
        this.height = map.header.height;
        this.tile = map.body.texture;
        this.sprite = map.body.data;
        this.start = map.body.start;
        this.end = map.body.end;
    }
}