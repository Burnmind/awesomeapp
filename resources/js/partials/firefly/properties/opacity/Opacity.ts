import Property from "@/partials/firefly/properties/Property";

export default class Opacity extends Property {
    // @ts-ignore
    private opacity: number;
    // @ts-ignore
    private newOpacity: number;
    // @ts-ignore
    private timeFunctionValue: number;
    private setTimeFunctionValue = true;

    protected setValues(): void {
        if (this.newOpacity != undefined) {
            this.opacity = this.newOpacity;
        } else {
            this.opacity = Opacity.getRandomOpacity();
        }

        this.newOpacity = this.getNextOpacity();
    }

    private static getRandomOpacity(): number {
        return Math.round(Math.random() * 100)/100;
    }

    private getNextOpacity(): number {
        let newOpacity;
        if (this.newOpacity == undefined) {
            newOpacity = Math.round(Math.random());
        } else {
            newOpacity = 1 - this.newOpacity;
        }

        return newOpacity;
    }

    public getOpacity(): number {
        return this.calculateOpacity(this.opacity, this.newOpacity);
    }

    public getInvertOpacity(): number {
        const invertOpacity = 1 - this.opacity;
        const newInvertOpacity = 1 - this.newOpacity;

        return this.calculateOpacity(invertOpacity, newInvertOpacity);
    }

    private calculateOpacity(opacity: number, newOpacity: number): number {
        if (this.setTimeFunctionValue) {
            this.timeFunctionValue = this.timeFunctionStep();
            this.setTimeFunctionValue = false;
        } else {
            this.setTimeFunctionValue = true;
        }

        return opacity + (newOpacity - opacity) * this.timeFunctionValue;
    }

    protected getNewSpeed(): number {
        return 0.01;
    }

    protected getChangeIndex(): number {
        return -(Math.round(30 + Math.random() * 100));
    }
}
