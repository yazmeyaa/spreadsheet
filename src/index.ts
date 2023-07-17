import { Cell } from "./base/cell";
import { TableSettings } from "./base/tableSettings";
import { Sheet } from "./components/sheet";
import { createSampleTableConfig, createSampleTableData } from "./utils/createSampleTableData";
import "./index.css"
import { Viewport } from "./base/viewport";

interface SettingsProperties {
    initialData?: Cell[][]
    config?: TableSettings
    view?: {
        height?: number
        width?: number
    }
}

export class Spreadsheet {
    sheet: Sheet
    data: Cell[][]
    config: TableSettings
    viewport: Viewport
    constructor(target: string | HTMLElement, settings?: SettingsProperties) {
        this.viewport = new Viewport({
            height: settings?.view?.height ?? 600,
            width: settings?.view?.width ?? 800,
            scrollLeft: 0,
            scrollTop: 0
        })
        this.sheet = new Sheet(this)
        this.data = settings?.initialData ?? createSampleTableData(25, 25, this)
        this.config = settings?.config ?? createSampleTableConfig(25, 25)

        if (typeof target === 'string') {
            const element = document.querySelector(target)
            if (!element) throw new Error('Provided element does not exist')
            this.sheet.appendTo(element)
        } else if (target instanceof Element) {
            this.sheet.appendTo(target)
        }


    }
}

const spreadsheet = new Spreadsheet('#app', {
    view: {
        height: 200,
        width: 600
    }
})

spreadsheet.sheet.renderSheet()
