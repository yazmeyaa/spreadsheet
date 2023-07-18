interface ViewportProperties {
    width: number
    height: number
    scrollTop: number
    scrollLeft: number
    lastRowInViewPort: number

}

export class Viewport implements ViewportProperties {
    width: number
    height: number
    scrollTop: number
    scrollLeft: number
    firstRowInViewport: number
    lastRowInViewPort: number

    constructor(props: ViewportProperties) {
        this.width = props.width
        this.height = props.height
        this.scrollLeft = props.scrollLeft
        this.scrollTop = props.scrollTop
        this.firstRowInViewport = 0
        this.lastRowInViewPort = props.lastRowInViewPort
    }


}