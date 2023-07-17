import { RenderBox } from "./renderBox"

export class Column {
    width: number
    title: string

    constructor(width: number, title: string) {
        this.width = width
        this.title = title
    }

}

export class Row {
    height: number
    title: string

    constructor(height: number, title: string) {
        this.height = height
        this.title = title
    }

}

export class TableSettings {
    columns: Column[]
    rows: Row[]


    constructor(columns: Column[], rows: Row[]) {
        this.columns = columns
        this.rows = rows

    }

    getCellPosition(row: number, col: number): RenderBox {
        const yPos = this.rows.slice(0, row).reduce((acc, curr) => {
            acc += curr.height
            return acc
        }, 0)

        const xPos = this.columns.slice(0, col).reduce((acc, curr) => {
            acc += curr.width
            return acc
        }, 0)

        const width = this.columns[col].width
        const height = this.rows[row].height

        return new RenderBox({
            height,
            width,
            x: xPos,
            y: yPos
        })

    }
}