export class PostModel {
    constructor(
        public user: string,
        public created: Date,
        public title: string,
        public image: string,
        public category: string,
        public content: any[],
        public id: string,
    ) {}
}

export class FormPostType {
    constructor(
      public user?: string,
      public date?: Date,
      public title?: string,
      public image?: string,
      public category?: string,
      public content?: any[],
      public id?: string,
    ) {}
  }
