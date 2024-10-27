import Markdown from "react-markdown";
import { commentsResponse, commentResponse } from "../InfoRetrival/gitService"
import Reactions from "./Reactions";

interface CommentsProps {
    comments: commentsResponse;
}

interface CommentProps {
    comment: commentResponse
}

function Comment ({comment}:CommentProps) {
    return (
        <div>
            <Markdown>{comment.body}</Markdown>
            <Reactions reactions={comment.reactions} />
        </div>
        
    )
}

export default function Comments({comments}:CommentsProps) {
    return (
        <div className="comment">
            {comments.map((comment) =>
                <Comment key={comment.id} comment={comment} />
            )};
        </div>
        
    )
}