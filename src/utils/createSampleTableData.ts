import { Spreadsheet } from "..";
import { Cell, CellProperties, Position } from "../base/cell";
import { Column, Row, TableSettings } from "../base/tableSettings";

export function createSampleTableData(rows: number, cols: number, sheet: Spreadsheet): Cell[][] {
    const data: Cell[][] = []
    for (let row = 0; row < rows; row++) {

        const innerRow: Cell[] = []
        for (let col = 0; col < cols; col++) {
            const showValue = `${row}:${col}`
            const cellProps: CellProperties = {
                display: showValue,
                result: showValue,
                value: showValue
            }

            const cell = new Cell(sheet, cellProps, new Position(col, row))

            innerRow.push(cell)
        }

        data.push(innerRow)
    }
    return data
}

export function createSampleTableConfig(rows: number, cols: number): TableSettings {
    const settings: TableSettings = new TableSettings([], [])

    const rowsArray: Row[] = []
    const colsArray: Column[] = []

    for (let row = 0; row < rows; row++) {
        const title = String(row + 1)
        rowsArray.push(new Row(40, title))
    }
    for (let col = 0; col < cols; col++) {
        const title = String(col + 1)
        colsArray.push(new Column(100, title))
    }

    settings.columns = structuredClone(colsArray)
    settings.rows = structuredClone(rowsArray)

    return settings
}