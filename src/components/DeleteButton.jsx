import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Confirm, Button, Icon } from "semantic-ui-react";
import { DELETE_COMMENT, DELETE_POST, GET_POSTS } from "../utils/Queries";

function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostOrComment] = useMutation(mutation, {
    variables: { postId, commentId },
    onError: (error) => {
      console.log(error);
    },
    update: (cache) => {
      setConfirmOpen(false);

      if (!commentId) {
        const data = cache.readQuery({ query: GET_POSTS });
        const updatedData = data.getPosts.filter((post) => post.id !== postId);
        cache.writeQuery({
          query: GET_POSTS,
          data: {
            getPosts: [...updatedData],
          },
        });
      }

      if (callback) callback();
    },
  });

  return (
    <>
      <Button color="red" floated="right" onClick={() => setConfirmOpen(true)}>
        <Icon name="trash alternate" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrComment}
      />
    </>
  );
}

export default DeleteButton;
