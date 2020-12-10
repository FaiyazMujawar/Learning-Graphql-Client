import React, { useContext } from "react";
import { Button, Card, Image, Icon, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

function PostCard({
  post: { id, username, body, createdAt, likes, likeCount, commentCount },
}) {
  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          className="rounded-image"
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <Button
            as={Link}
            to={`posts/${id}`}
            labelPosition="right"
            onClick={postComment}
          >
            <Button basic color="violet">
              <Icon name="comments" />
            </Button>
            <Label basic color="violet" pointing="left">
              {commentCount}
            </Label>
          </Button>
          {user && user.username === username && <DeleteButton postId={id} />}
        </div>
      </Card.Content>
    </Card>
  );
}

export default PostCard;
