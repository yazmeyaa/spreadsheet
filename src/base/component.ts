export abstract class Component {
    abstract appendTo: (targetNode: HTMLElement) => void
    abstract createElement: () => HTMLElement | Record<string, HTMLElement>
}