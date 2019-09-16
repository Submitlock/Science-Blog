export class PostHeadingElement {
    constructor(public heading: string, public size: string, public align: string, public color: string) {}
}

export class PostParagraphElement {
    constructor(public paragraph: string, public align: string, public color: string) {}
}

export class PostImageElement {
    constructor(public image: string, public size: number, public align: string, public radius: number) {}
}

