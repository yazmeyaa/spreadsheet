import { Spreadsheet } from ".."


export class Position {
    col: number
    row: number

    constructor(col: number, row: number) {
        this.col = col
        this.row = row
    }
}

export interface CellProperties {
    display: string
    value: number | string
    result: string
}

export class Cell implements CellProperties {
    display: string
    value: string | number
    result: string
    ctx: CanvasRenderingContext2D
    position: Position
    sheet: Spreadsheet

    constructor(spreadsheet: Spreadsheet, props: CellProperties, position: Position) {
        this.sheet = spreadsheet
        this.ctx = spreadsheet.sheet.ctx
        const { display, result, value } = props
        this.display = display
        this.result = result
        this.value = value
        this.position = position
    }

    render() {
        const { col, row } = this.position

        const renderBox = this.sheet.config.getCellPosition(row, col)
        const { height, width, x, y } = renderBox

        this.ctx.fillStyle = 'white'
        this.ctx.strokeStyle = 'black'
        this.ctx.lineWidth = 2
        this.ctx.fillRect(x + 1, y + 1, width - 1, height - 1)
        this.ctx.strokeRect(x + 1, y + 1, width - 1, height - 1)
        this.ctx.stroke()
        this.ctx.fillStyle = 'black'

        this.ctx.font = '16px Arial'
        this.ctx.textAlign = 'left'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(this.display, x + 2, y - height / 2, width)
    }
}