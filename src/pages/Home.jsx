import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";

import { GET_POSTS } from "../utils/Queries";
import PostCard from "../components/PostCard";
import AddPostForm from "../components/AddPostForm";
import { AuthContext } from "../context/Auth";

function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(GET_POSTS);

  const posts = data?.getPosts;

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>New Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <AddPostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          <Transition.Group>
            {posts &&
              posts.map((post) => (
                <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
