export class CommentsModel {
    constructor(
        public userID: string,
        public userEmail: string,
        public postID: string,
        public postUserID: string,
        public created: Date,
        public content: string,
        public commentID?: string
    ) {}
}
