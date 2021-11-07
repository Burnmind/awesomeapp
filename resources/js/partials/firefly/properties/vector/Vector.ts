import Property from "@/partials/firefly/properties/Property";

export default class Vector extends Property {
    // @ts-ignore
    private length: number;
    // @ts-ignore
    private rad: number;
    // @ts-ignore
    private newRad: number;
    private changeRadSpeed = 0.01;
    private increment: boolean;

    protected restartCoefficient = 0.8;

    public constructor() {
        super();

        this.increment = true;

        this.initLength();
    }

    protected setValues(): void {
        this.initRad();
    }

    private initLength(): void {
        this.length = 2 + (Math.random() * 3);
    }

    private initRad(): void {
        if (this.rad) {
            this.newRad = this.rad - Math.PI/2 + Math.random() * Math.PI;
        } else {
            this.rad = Math.random() * 2 * Math.PI;
            this.newRad = this.rad;
        }
    }

    public invertRadX(): void {
        this.rad = -this.rad + Math.PI;
        this.newRad = this.rad;
    }

    public invertRadY(): void {
        this.rad = -this.rad;
        this.newRad = this.rad;
    }

    public getXOffset(): number {
        return this.length * this.timeFunctionStep() * this.getCos();
    }

    public getYOffset(): number {
        return this.length * this.timeFunctionStep() * this.getSin();
    }

    private getCos(): number {
        return Math.cos(this.rad);
    }

    private getSin(): number {
        return Math.sin(this.rad);
    }

    protected getNewSpeed(): number {
        return 0.005 + Math.random() * 0.002;
    }

    protected getChangeIndex(): number {
        return -(Math.round(-70 + Math.random() * 140));
    }

    protected timeFunctionStep(): number {
        this.rad += (this.newRad - this.rad) * this.changeRadSpeed;

        const result = this.timeFunction();

        if (result >= this.restartCoefficient || result <= 1 - this.restartCoefficient) {
            this.increment = !this.increment;
            this.setValues();
        }

        if (this.increment) {
            this.changeIndex++;
        } else {
            this.changeIndex--;
        }

        return result;
    }
}
