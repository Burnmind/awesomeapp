import * as PIXI from "pixi.js";
import Vector from "@/partials/firefly/properties/vector/Vector";
import Opacity from "@/partials/firefly/properties/opacity/Opacity";

export default class Firefly {
    private vector: Vector;
    private opacity: Opacity;

    private readonly scaleSpeed: number;
    private newScale: number;

    private readonly lightSprite: PIXI.Sprite;
    private readonly darkSprite: PIXI.Sprite;
    private readonly firefly: PIXI.Container;

    constructor() {
        this.firefly = new PIXI.Container();
        
        const lightTexture = PIXI.Texture.from('images/firefly.png');
        const darkTexture = PIXI.Texture.from('images/firefly.png');
        
        this.lightSprite = PIXI.Sprite.from(lightTexture);
        this.darkSprite = PIXI.Sprite.from(darkTexture);

        this.lightSprite.anchor.set(0.5);
        this.darkSprite.anchor.set(0.5);

        this.opacity = new Opacity();
        this.lightSprite.alpha = this.opacity.getOpacity();
        this.darkSprite.alpha = this.opacity.getInvertOpacity();

        this.firefly.addChild(this.lightSprite);
        this.firefly.addChild(this.darkSprite);

        this.firefly.x = Firefly.getNewX();
        this.firefly.y = Firefly.getNewY();

        this.vector = new Vector();

        const scale = Firefly.getNewScale();
        this.lightSprite.scale.set(scale);
        this.darkSprite.scale.set(scale);

        this.scaleSpeed = Firefly.getNewScaleSpeed();
        this.newScale = Firefly.getNewScale();
    }

    getFireflyContainer(): PIXI.Container {
        return this.firefly;
    }

    step(): void {
        let XOffset = this.vector.getXOffset();
        let YOffset = this.vector.getYOffset();

        const overflow = this.checkOverflow(XOffset, YOffset);
        const collision = this.checkCollision(XOffset, YOffset);

        if (overflow || collision) {
            XOffset = this.vector.getXOffset();
            YOffset = this.vector.getYOffset();
        }

        this.firefly.x += XOffset;
        this.firefly.y += YOffset;

        this.lightSprite.alpha = this.opacity.getOpacity();
        this.darkSprite.alpha = this.opacity.getInvertOpacity();

        this.firefly.scale.set(this.firefly.scale.x + (this.newScale - this.firefly.scale.x) * this.scaleSpeed);

        if (this.newScale >= this.firefly.scale.x - 0.1 && this.newScale <= this.firefly.scale.x + 0.1) {
            this.newScale = Firefly.getNewScale();
        }
    }

    private checkOverflow(XOffset: number, YOffset: number): boolean {
        const x = this.firefly.x + XOffset;
        const y = this.firefly.y + YOffset;
        let overflow = false;

        if (x - window.innerWidth / 2 > 0) {
            this.firefly.x = window.innerWidth/2;
            overflow = true;
        } else if (-window.innerWidth/2 - x >= 0) {
            this.firefly.x = -window.innerWidth/2;
            overflow = true;
        }

        if (y - window.innerHeight / 2 > 0) {
            this.firefly.y = window.innerHeight/2;
            overflow = true;
        } else if (-window.innerHeight/2 - y >= 0) {
            this.firefly.y = -window.innerHeight/2;
            overflow = true;
        }

        return overflow;
    }

    private checkCollision(XOffset: number, YOffset: number): boolean {
        const x = this.firefly.x + XOffset;
        const y = this.firefly.y + YOffset;
        let collision = false;


        if (x > window.innerWidth/2 || x < -window.innerWidth/2) {
            this.vector.invertRadX();
            collision = true;
        }

        if (y > window.innerHeight/2 || y < -window.innerHeight/2) {
            this.vector.invertRadY();
            collision = true;
        }

        return collision;
    }

    private static getNewScaleSpeed(): number {
        return 0.007 + Math.random() * 0.023;
    }

    private static getNewScale(): number {
        return 0.15 + Math.random() * 0.65;
    }

    private static getNewX(): number {
        const newX = Math.random() * (window.innerWidth - 20) - (window.innerWidth / 2) + 10;
        return Math.round(newX);
    }

    private static getNewY(): number {
        const mewY = Math.random() * (window.innerHeight - 20) - (window.innerHeight / 2) + 10;
        return Math.round(mewY);
    }
}
