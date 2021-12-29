import { Post } from '../../Post/Post';
import React from 'react';
import { Stories } from '../../Stories/Stories';
import { Suggestions } from '../../Suggestions/Suggestions';
import { useSelect } from '@wordpress/data';
import styles from './HomePage.module.css';

export function HomePage() {
  const [pageNumber, setPageNumber] = React.useState(20);
  const data = useSelect((select) => select('ig-posts').getPosts(pageNumber));
  const isLoading = useSelect((select) => select('ig-posts').getIsLoading());
  const [scrollEnd, setScrollEnd] = React.useState(false);
  console.log(
    scrollEnd
  );
  React.useEffect(() => {
    const handler = () => {
      if (
        document.body.scrollHeight <
        window.pageYOffset + window.innerHeight + 200
      ) {
        if (!scrollEnd && !isLoading) {
          setPageNumber(pageNumber + 20);
          setScrollEnd(true)
        }
      } else {
        setScrollEnd(false)
      }
    };
    window.addEventListener('scroll', handler);
    return () => {
      window.removeEventListener('scroll', handler);
    };
  }, [scrollEnd, isLoading]);
  return (
    <div className={styles.content}>
      <div className={styles.leftSide}>
        <Stories />
        {data?.map((datum, index) => (
          <Post
            datum={datum}
            comments={datum?.comments}
            index={index}
            key={datum.post_id}
          />
        ))}
      </div>
      <div className={styles.rightSide}>
        <div className={styles.fixedContent}>
          <Suggestions />
        </div>
      </div>
    </div>
  );
}
