import { useMutation, useQuery } from "@apollo/client";
import React, { useContext, useRef, useState } from "react";
import {
  Button,
  Card,
  Form,
  Grid,
  Icon,
  Image,
  Label,
} from "semantic-ui-react";

import { AuthContext } from "../context/Auth";
import { CREATE_COMMENT, GET_POST } from "../utils/Queries";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import moment from "moment";

function Post(props) {
  const { user } = useContext(AuthContext);

  const postId = props.match.params.postId;

  const [comment, setComment] = useState("");

  const { data, loading } = useQuery(GET_POST, {
    variables: { postId: postId },
    onError: (error) => {
      console.log(error.message);
    },
  });

  const commentInputRef = useRef(null);

  const [submitComment] = useMutation(CREATE_COMMENT, {
    variables: { postId: postId, body: comment },
    onError: (error) => console.log(error),
    update: () => {
      setComment("");
      commentInputRef.current.blur();
    },
  });

  function deletePostCallback() {
    // Return to home after deleting post
    props.history.push("/");
  }

  const getPost = data?.getPost;

  return (
    <Grid>
      {loading ? (
        <Grid.Row>
          <h3>Loading...</h3>
        </Grid.Row>
      ) : (
        getPost && (
          <Grid.Row>
            <Grid.Column width={3}>
              <Image
                className="rounded-image"
                floated="right"
                size="small"
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
              />
            </Grid.Column>
            <Grid.Column width={13}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{getPost.username}</Card.Header>
                  <Card.Meta>{moment(getPost.createdAt).fromNow()}</Card.Meta>
                  <Card.Description>{getPost.body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <LikeButton
                    user={user}
                    post={{
                      id: getPost.id,
                      likes: getPost.likes,
                      likeCount: getPost.likeCount,
                    }}
                  />
                  <Button
                    as="div"
                    labelPosition="right"
                    onClick={() => console.log("Commenting")}
                  >
                    <Button basic color="violet">
                      <Icon name="comments" />
                    </Button>
                    <Label basic color="violet" pointing="left">
                      {getPost.commentCount}
                    </Label>
                  </Button>
                  {user && user.username === getPost.username && (
                    <DeleteButton
                      postId={postId}
                      callback={deletePostCallback}
                    />
                  )}
                </Card.Content>
              </Card>
              {user && (
                <Form>
                  <div className="ui action input fluid">
                    <input
                      type="text"
                      value={comment}
                      onChange={(event) => setComment(event.target.value)}
                      placeholder="Write a coment"
                      ref={commentInputRef}
                    />
                    <Button
                      disabled={comment.trim() === ""}
                      color="violet"
                      onClick={submitComment}
                    >
                      <Icon name="paper plane" />
                    </Button>
                  </div>
                </Form>
              )}
              {getPost.comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.username === comment.username && (
                      <DeleteButton postId={postId} commentId={comment.id} />
                    )}
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        )
      )}
    </Grid>
  );
}

export default Post;
