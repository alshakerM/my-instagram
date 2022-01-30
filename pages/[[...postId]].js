import { HomePage } from '../components/pages/HomePage/HomePage';
import { PostPage } from '../components/pages/PostPage';
import { NavBar } from '../components/NavBar/NavBar';
import { useSelect } from '@wordpress/data';
import React from 'react';
import { UserProfile } from '../components/pages/UserProfile/UserProfile';

export default function CatchAll({ query }) {
  const expandedPostId = useSelect((select) =>
    select('ig-posts').getExpandedPost()
  );

  const serverPostId = query?.postId?.[1];
  const userName = query?.postId?.[0];
  const onlyComments = query?.postId?.[2] === 'comments';

  // when expanded post is closed, the postId from the query remains stuck
  // which means postId is true, and expandedPostId is false, which looks like an independent post
  // this makes sure to keep track of expandedPostId until serverPostId changes (the query resets)
  // keeping them in sync
  const lastExpandedPostId = React.useMemo(
    () => expandedPostId,
    [serverPostId]
  );

  // user profile route
  if (
    query?.postId?.length === 1 ||
    ['channel', 'tagged'].includes(query?.postId?.[1])
  ) {
    return (
      <>
        <NavBar userName={userName} />
        <UserProfile userName={userName} />
      </>
    );
  }

  // expanded post (in feed) page
  if ((expandedPostId || lastExpandedPostId) && !onlyComments) {
    return (
      <>
        <NavBar />
        <HomePage />
        <PostPage
          postId={expandedPostId || lastExpandedPostId}
          isFloating
          onlyComments={onlyComments}
        />
      </>
    );
  }

  // independent post id
  if (serverPostId) {
    return (
      <>
        <NavBar />
        <PostPage postId={serverPostId} onlyComments={onlyComments} />
      </>
    );
  }

  return (
    <>
      <NavBar />
      <HomePage />
    </>
  );
}

CatchAll.getInitialProps = async function (context) {
  return { query: context.query };
};
