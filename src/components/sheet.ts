import { Spreadsheet } from "..";
import { Component } from "../base/component";
import { Column, Row } from "../base/tableSettings";

class Sheet implements Component {
    component: HTMLDivElement
    topScrollFiller: HTMLDivElement
    bottomScrollFiller: HTMLDivElement
    leftScrollFiller: HTMLDivElement
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
    spreadsheet: Spreadsheet
    constructor(spreadsheet: Spreadsheet) {
        this.spreadsheet = spreadsheet
        const element = this.createElement()
        const { canvas, container, bottomScrollFiller, topScrollFiller, leftScrollFiller } = element

        this.topScrollFiller = topScrollFiller
        this.bottomScrollFiller = bottomScrollFiller
        this.leftScrollFiller = leftScrollFiller

        let initialLeftScrollFillerWidth = this.spreadsheet.config.columns.reduce((acc, curr) => {
            acc += curr.width
            return acc
        }, 0)

        this.leftScrollFiller.style.width = initialLeftScrollFillerWidth + 'px'


        let initialBottomFillerHeight = this.spreadsheet.config.rows.reduce((acc, curr) => {
            acc += curr.height
            return acc
        }, 0) - this.spreadsheet.viewport.height

        this.bottomScrollFiller.style.height = initialBottomFillerHeight + 'px'
        this.bottomScrollFiller.style.width = '0px';


        this.canvas = canvas
        this.component = container
        this.canvas.width = this.spreadsheet.viewport.width
        this.canvas.height = this.spreadsheet.viewport.height

        this.component.style.height = this.spreadsheet.viewport.height + 'px'
        this.component.style.width = this.spreadsheet.viewport.width + 'px'

        const ctx = this.canvas.getContext('2d')

        if (!ctx) throw new Error('Enable hardware acceleration for using canvas rendering context')
        this.ctx = ctx

        this.component.addEventListener('scroll', this.handleScroll)
    }

    handleScroll = (event: Event) => {
        event.preventDefault()
        event.stopImmediatePropagation()
        const target = event.target as HTMLDivElement
        const scrollTop = target.scrollTop

        const firstRow = this.getFirstRowInViewport(scrollTop, this.spreadsheet.config.rows)
        this.spreadsheet.viewport.firstRowInViewport = firstRow
        const lastRow = this.getLastRowInViewport(scrollTop, this.spreadsheet.config.rows)
        this.spreadsheet.viewport.lastRowInViewPort = lastRow
        
        const topFillerHeight = this.getTopFillerHeight()
        this.topScrollFiller.style.height = topFillerHeight + 'px'
        const bottomFillerHeight = this.getBottomFillerHeight()
        this.bottomScrollFiller.style.height = bottomFillerHeight + 'px'

        const firstCol = this.getFirstColumnInViewport(target.scrollLeft, this.spreadsheet.config.columns)
        const lastCol = this.getLastColumnInViewport(target.scrollLeft, this.spreadsheet.config.columns)

        console.log(`First col: ${firstCol}, last col: ${lastCol}`)

        this.component.scrollTo({
            top: scrollTop
        })

        this.renderSheet(firstRow, lastRow, firstCol, lastCol)
    }

    getFirstRowInViewport(currentScroll: number, rows: Row[]): number {
        let rowIdx = 0
        for (let i = 0, height = 0; height < currentScroll; i++) {
            const currRow = rows[i]
            height += currRow.height
            if (height >= currentScroll) rowIdx = i
        }
        return rowIdx
    }

    getLastRowInViewport(currentScroll: number, rows: Row[]): number {
        const firstRowInViewport = this.getFirstRowInViewport(currentScroll, rows)
        let lastRowIdx = firstRowInViewport
        const viewportHeight = this.spreadsheet.viewport.height
        const viewportBottom = currentScroll + viewportHeight

        for (let idx = firstRowInViewport, height = currentScroll; height < viewportBottom; idx++) {
            height += this.spreadsheet.config.rows[idx].height
            lastRowIdx = idx
        }
        return lastRowIdx
    }

    getFirstColumnInViewport(currentScroll: number, cols: Column[]): number {
        let colIdx = 0
        for (let i = 0, width = 0; width < currentScroll; i++) {
            const currCol = cols[i]
            width += currCol.width
            if (width >= currentScroll) colIdx = i
        }
        return colIdx
    }

    getLastColumnInViewport(currentScroll: number, cols: Column[]): number {
        const firstColumnInViewport = this.getFirstColumnInViewport(currentScroll, cols)
        let lastColIdx = firstColumnInViewport
        const viewportWidth = this.spreadsheet.viewport.width
        const viewportRight = currentScroll + viewportWidth
        for (let idx = firstColumnInViewport, width = currentScroll; width < viewportRight; idx++) {
            width += this.spreadsheet.config.columns[idx].width
            lastColIdx = idx
        }
        return lastColIdx
    }

    getTopFillerHeight(): number {
        const firstRow = this.spreadsheet.viewport.firstRowInViewport
        let height = 0
        for (let i = 0; i < firstRow; i++) {
            height += this.spreadsheet.config.rows[i].height
        }
        return height
    }

    getBottomFillerHeight(): number {
        const lastRow = this.spreadsheet.viewport.lastRowInViewPort
        const lastConfigRow = this.spreadsheet.config.rows.length - 1
        if (lastRow === lastConfigRow) return 0;
        let height = 0
        for (let i = lastRow; i <= lastConfigRow - 1; i++) {
            height += this.spreadsheet.config.rows[i].height
        }
        return height
    }

    appendTo(targetNode: Element): void {
        targetNode.appendChild(this.component)
    };

    createElement() {
        const container = document.createElement('div')
        container.classList.add('spreadsheet_container')
        const canvas = document.createElement('canvas')
        const leftScrollFiller = document.createElement('div')
        leftScrollFiller.classList.add('spreadsheet_left_scroll_filler')

        const topScrollFiller = document.createElement('div')
        topScrollFiller.classList.add('spreadsheet_top_scroll_filler')
        const bottomScrollFiller = document.createElement('div')
        bottomScrollFiller.classList.add('spreadsheet_bottom_scroll_filler')
        container.appendChild(topScrollFiller)
        container.appendChild(canvas)
        container.appendChild(bottomScrollFiller)
        container.appendChild(leftScrollFiller)

        return { container, canvas, topScrollFiller, bottomScrollFiller, leftScrollFiller }
    };

    renderCell(row: number, col: number): void {
        this.spreadsheet.data[row][col].render()
    }

    renderSheet(firstRow: number, lastRow: number, firstCol: number, lastCol: number): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height) //Clear screen

        let rowsCount = 0;
        for (let row = firstRow; row <= lastRow + 10; row++) {
            for (let col = firstCol; col < lastCol; col++) {
                this.renderCell(row, col)
            }
            rowsCount += 1
        }

    }

}

export { Sheet }
