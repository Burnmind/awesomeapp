import Property from "@/partials/firefly/properties/Property";

export default class Opacity extends Property {
    private opacity = Opacity.getRandomOpacity();
    private newOpacity = Opacity.getRandomOpacity();

    // @ts-ignore
    private timeFunctionValue: number;
    private setTimeFunctionValue = true;

    protected setValues(): void {
        if (this.newOpacity) {
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
        if (!this.newOpacity) {
            newOpacity = Opacity.getRandomOpacity();
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

        return Math.round((opacity + (newOpacity - opacity) * this.timeFunctionValue) * 1000) / 1000;
    }

    protected getNewSpeed(): number {
        return 0.05;
    }

    protected getChangeIndex(): number {
        return -(Math.round(30 + Math.random() * 100));
    }
}
