import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Form } from "semantic-ui-react";

import { hooks } from "../utils/Hooks";

import { CREATE_POST, GET_POSTS } from "../utils/Queries";

function AddPostForm() {
  const submitPost = () => createPost();

  const { values, onChange, onSubmit } = hooks(submitPost, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    onError: () => {},
    update: (proxy, { data: { createPost: newPost } }) => {
      // All fetched posts are cached by Apollo Client.
      // To automatically add the newly created post without
      // fetching again, writing directly it to the cache.
      const data = proxy.readQuery({
        query: GET_POSTS,
      });
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
          getPosts: [newPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
  });

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <h2>Create a post...</h2>
          <Form.Input
            placeholder="What's on your mind?"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="violet">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui negative message" style={{ marginBottom: 20 }}>
          <p>{error.graphQLErrors[0].message}</p>
        </div>
      )}
    </>
  );
}

export default AddPostForm;
