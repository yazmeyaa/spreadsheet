export interface RenderBoxProperties {
    x: number
    y: number
    width: number
    height: number
}

export class RenderBox implements RenderBoxProperties {
    x: number
    y: number
    width: number
    height: number

    constructor(box: RenderBoxProperties) {
        const { height, width, x, y } = box
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}