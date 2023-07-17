interface ViewportProperties {
    width: number
    height: number
    scrollTop: number
    scrollLeft: number
}

export class Viewport implements ViewportProperties {
    width: number
    height: number
    scrollTop: number
    scrollLeft: number

    constructor(props: ViewportProperties) {
        this.width = props.width
        this.height = props.height
        this.scrollLeft = props.scrollLeft
        this.scrollTop = props.scrollTop
    }


}