export default abstract class Property {
    protected readonly changeSpeed: number;
    protected changeIndex: number;
    protected restartCoefficient = 1;

    public constructor() {
        this.changeSpeed = this.getNewSpeed();
        this.changeIndex = this.getChangeIndex();

        this.setValues();
    }

    protected abstract setValues(): void;

    protected abstract getNewSpeed(): number;

    protected abstract getChangeIndex(): number;

    protected timeFunctionStep(): number {
        const result = this.timeFunction();

        if (result >= this.restartCoefficient) {
            this.changeIndex = -this.changeIndex;
            this.setValues();
        } else {
            this.changeIndex++;
        }

        return result;
    }

    protected timeFunction(): number {
        return Math.round((1 / (1 + Math.pow(Math.E, -this.changeSpeed * this.changeIndex))) * 1000)/1000;
    }
}
