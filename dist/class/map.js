import { Vec2 } from "./vec2.js";
export class Map {
    tile;
    sprite;
    width;
    height;
    start = new Vec2();
    end = new Vec2();
    constructor(map) {
        this.width = map.header.width;
        this.height = map.header.height;
        this.tile = map.body.texture;
        this.sprite = map.body.data;
        this.start = map.body.start;
        this.end = map.body.end;
    }
}
