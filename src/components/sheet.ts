import { Spreadsheet } from "..";
import { Component } from "../base/component";
import { TableSettings } from "../base/tableSettings";

class Sheet implements Component {
    component: Element
    canvas: HTMLCanvasElement
    topScrollFiller: HTMLDivElement
    bottomScrollFiller: HTMLDivElement
    ctx: CanvasRenderingContext2D
    spreadsheet: Spreadsheet
    constructor(spreadsheet: Spreadsheet) {
        this.spreadsheet = spreadsheet
        const element = this.createElement()
        const { bottomScrollFiller, canvas, container, topScrollFiller } = element

        this.canvas = canvas
        this.topScrollFiller = topScrollFiller
        this.component = container
        this.bottomScrollFiller = bottomScrollFiller

        const ctx = this.canvas.getContext('2d')

        if (!ctx) throw new Error('Enable hardware acceleration for using canvas rendering context')
        this.ctx = ctx
    }
    appendTo(targetNode: Element) {
        targetNode.appendChild(this.canvas)
    };
    createElement() {
        const container = document.createElement('div')
        const canvas = document.createElement('canvas')

        canvas.width = this.spreadsheet.viewport.width
        canvas.height = this.spreadsheet.viewport.height

        const topScrollFiller = document.createElement('div')
        const bottomScrollFiller = document.createElement('div')
        container.append(topScrollFiller)
        container.appendChild(canvas)
        container.append(bottomScrollFiller)

        return { container, canvas, topScrollFiller, bottomScrollFiller }
    };


    renderSheet() {
        const { data } = this.spreadsheet

        const rowsCount = data.length
        const colsCount = (data[0] && data[0].length) ?? 0

        for (let row = 0; row < rowsCount; row++) {
            for (let col = 0; col < colsCount; col++) {
                data[row][col].render()
            }
        }
    }

}

export { Sheet }
