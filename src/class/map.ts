import { Vec2 } from "./vec2.js";

export class Map {

    data: number[];
    width: number;
    height: number;
    start: Vec2 = new Vec2();
    end: Vec2 = new Vec2();

    constructor(map: any) {
        this.width = map.width;
        this.height = map.height;
        this.data = map.data;
        this.start = map.start;
        this.end = map.end;
    }
}