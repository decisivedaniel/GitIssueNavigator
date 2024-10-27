import Markdown from "react-markdown";
import { commentsResponse, commentResponse } from "../InfoRetrival/gitService"
import Reactions from "./Reactions";
import "./Comment.css"

interface CommentsProps {
    comments: commentsResponse;
}

interface CommentProps {
    comment: commentResponse
}

function Comment ({comment}:CommentProps) {
    return (
        <div className="Comment">
            <Markdown>{comment.body}</Markdown>
            <Reactions reactions={comment.reactions} />
        </div>
        
    )
}

export default function Comments({comments}:CommentsProps) {
    return (
        <div className="Comments">
            {comments.map((comment) =>
                <Comment key={comment.id} comment={comment} />
            )}
        </div>
        
    )
}