import RoomItem from "./RoomItem";
import { calculateZIndexFloorItem } from "../RoomEngine";
import { ItemType, Direction } from "../../imagers/furniture/FurniImager";
import Room from "../Room";
import { Sprite } from "pixi.js";
import { FLOOR_ITEM_PLACEHOLDER, FLOOR_ITEM_PLACEHOLDER_OFFSET_X, FLOOR_ITEM_PLACEHOLDER_OFFSET_Y } from "../../graphics/GenericSprites";
import BobbaEnvironment from "../../BobbaEnvironment";

export default class FloorItem extends RoomItem {
    constructor(id: number, x: number, y: number, z: number, rot: Direction, state: number, baseId: number, room: Room) {
        const placeholder = new Sprite();
        placeholder.texture = BobbaEnvironment.getGame().engine.getTexture(FLOOR_ITEM_PLACEHOLDER);
        placeholder.x = FLOOR_ITEM_PLACEHOLDER_OFFSET_X;
        placeholder.y = FLOOR_ITEM_PLACEHOLDER_OFFSET_Y;
        super(id, x, y, z, rot, state, baseId, room, placeholder);
    }

    updateSpritePosition() {
        const { x, y } = this.room.engine.tileToLocal(this._x, this._y, this._z);
        for (let container of this.containers) {
            container.x = x + DRAWING_OFFSET_X;
            container.y = y + DRAWING_OFFSET_Y;
        }

    }

    calculateZIndex(zIndex: number, layerIndex: number): number {
        return calculateZIndexFloorItem(this._x, this._y, this._z, zIndex, layerIndex)
    }

    getItemType(): ItemType {
        return 'roomitem';
    }
}


const DRAWING_OFFSET_X = 32;
const DRAWING_OFFSET_Y = 16;