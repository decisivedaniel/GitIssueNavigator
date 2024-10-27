import { reactionResponse } from "../InfoRetrival/gitService";
import "./Reactions.css"

const githubReactions = ["+1", "-1", "laugh", "confused", "heart", "hooray", "eyes", "rocket"] as const;
type GitHubReaction = typeof githubReactions[number];  

interface ReactionUnitProps {
    reaction:Readonly<reactionResponse>;
    description:GitHubReaction;
}

export interface ReactionsProps {
    reactions:Readonly<reactionResponse>;
}

function ReactionUnit ({reaction, description}: ReactionUnitProps ) {
    if (reaction === undefined) {
        return null;
    }
    const reactionNumber = reaction[description]
    if (reactionNumber > 0) {
        return (<div className="Reaction"><p>{description}:{reactionNumber}</p></div>);
    } else {
        return null;
    }
}

export default function Reactions ({reactions}:Readonly<ReactionsProps>) {
    if (reactions?.total_count === 0 ) {
        return null;
    }
    return (
        <div className="Reactions">
            {githubReactions.map((key) =>
                <ReactionUnit key="{key}" reaction={reactions} description={key} />
            )}
        </div>
    );
}