import Firefly from './firefly/Firefly'
import * as PIXI from "pixi.js";

export default class FireflyGlade {
    private fireflyList: Firefly[] = [];
    private readonly container: PIXI.Container;

    constructor(quantity: number) {
        this.container = new PIXI.Container();

        for (let i = 0; i < quantity; i++) {
            const firefly = new Firefly();

            this.container.addChild(firefly.getFireflyContainer());
            this.fireflyList.push(firefly);
        }

        this.containerToCenter();

        window.addEventListener('resize', this.containerToCenter.bind(this));
    }

    playFrame() {
        this.fireflyList.forEach((firefly) => {
            firefly.step();
        });
    }

    getContainer() {
        return this.container;
    }

    containerToCenter() {
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;
    }
}
