export class PostModel {
    constructor(
        public postID: string,
        public postUserID: string,
        public userEmail: string,
        public created: Date,
        public category: string,
        public title: string,
        public image: string,
        public content: any[],
    ) {}
}

export class FormPostType {
    constructor(
      public postID?: string,
      public postUserID?: string,
      public userEmail?: string,
      public created?: Date,
      public category?: string,
      public title?: string,
      public image?: string,
      public content?: any[],
    ) {}
  }
