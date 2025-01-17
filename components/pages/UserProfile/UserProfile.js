import { Check, Person, PhotoCameraFrontOutlined } from '@mui/icons-material';
import cx from 'classnames';
import React from 'react';
import Link from 'next/link';
import styles from './UserProfile.module.css';
import { Avatar } from '../../Avatar/Avatar';
import { readableNumber, useMediaQuery } from '../../../utils';
import '../../../stores/profileStore';
import { useRouter } from 'next/router';
import { useSelect } from '@wordpress/data';
import { useDispatch } from '@wordpress/data';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function DialogSection({ setOpenDialog }) {
  const users = useSelect((select) => select('ig-profile').getProfiles());

  return (
    <Dialog
      open={true}
      onClose={() => setOpenDialog(false)}
      className={styles.dialog}
    >
      <DialogTitle className={styles.dialogTitle}>
        <div className={styles.emptyDiv}></div>
        <p className={styles.followersText}>Followers</p>
        <button
          className={styles.clearButton}
          onClick={() => setOpenDialog(false)}
        >
          <svg
            aria-label="Close"
            className={styles.clearIcon}
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="21"
              y2="3"
            ></line>
          </svg>
        </button>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {users?.map((data) => (
          <div className={styles.followersSection} key={data.user_id}>
            <div onClick={() => setOpenDialog(false)}>
              <Avatar
                user={data}
                alt="profile pic"
                size="small"
                link={
                  data.user_has_story
                    ? `/stories/${data.user_id}`
                    : `/${data.user_name}`
                }
                colorRing={data.user_has_story}
              />
            </div>
            <div className={styles.followerInfo}>
              <p className={styles.followersUserName}>{data.user_name}</p>
              <p className={styles.followersFullName}>{data.full_name}</p>
            </div>
            <button className={styles.followersButton}>Follow</button>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
}
function UserProfilePost({ post }) {
  const { setExpandedPost } = useDispatch('ig-posts');
  return (
    <Link shallow href={`/?postId=${post.post_id}&source=profile`}>
      <a
        className={styles.postContainer}
        onClick={() => setExpandedPost(post.post_id)}
      >
        <img
          src={post.post_image.url}
          alt={post.user_name}
          className={styles.postImg}
        />
        <div className={styles.postHover}>
          <div className={styles.likeIconCount}>
            <svg
              aria-label="like-icon"
              className={styles.Icon}
              height="19"
              role="img"
              viewBox="0 0 48 48"
              width="19"
              fill="white"
            >
              <path
                className={styles.Icon}
                d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"
              ></path>
            </svg>
            <p>{readableNumber(post.likes_count)}</p>
          </div>
          <div className={styles.likeIconCount}>
            <svg
              aria-label="Comment"
              height="19"
              role="img"
              viewBox="0 0 48 48"
              width="19"
            >
              <ellipse cx="24" cy="24" rx="24" ry="21" fill="white" />
              <path d="M10 30, 40 20, 48 48" fill="white" />
            </svg>
            <p>{readableNumber(post.comment_count)}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
export function UserProfile({ userName }) {
  const location = useRouter();
  const postType = location.asPath.includes('tagged') ? 'tagged' : 'posts';
  const isMobile = useMediaQuery('(max-width: 735px)');
  const user = useSelect((select) =>
    select('ig-profile').getProfile(userName, postType)
  );

  const [openDialog, setOpenDialog] = React.useState(false);
  if (!user?.user_id) {
    return null;
  }
  return (
    <>
      <div className={styles.profilePage}>
        <div className={styles.header}>
          <div className={styles.imgContainer}>
            <Avatar
              user={user}
              size={isMobile ? 'above-medium' : 'large'}
              animate={user.user_has_story}
              colorRing={user.user_has_story}
            />
          </div>
          <div className={styles.userInfoAndBio}>
            <p className={styles.userInfo}>
              <strong>{user?.full_name}</strong>
            </p>
            <p className={styles.userInfo}>{user?.bio}</p>
            <p className={styles.userInfo}>📍 Baghdad, Iraq.</p>
          </div>

          <p className={styles.userName}>{user.user_name}</p>
          <button className={styles.threeDotsButton}>
            <svg
              aria-label="Options"
              fill="#262626"
              height="32"
              role="img"
              viewBox="0 0 24 24"
              width="32"
            >
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6.5" cy="12" r="1.5"></circle>
              <circle cx="17.5" cy="12" r="1.5"></circle>
            </svg>
          </button>

          <div className={styles.buttonsContainer}>
            <Link href={`direct/t/${user.user_id}`}>
              <a className={styles.messageButton}>
                <strong>Message</strong>
              </a>
            </Link>
            <button className={styles.followButton}>
              <Person style={{ padding: '0', margin: 0 }} fontSize="small" />
              <Check fontSize="small" className={styles.checkIcon} />
            </button>

            <button className={styles.showMore}>
              <svg
                aria-label="Down Chevron Icon"
                className={styles.DownIcon}
                fill="#262626"
                height="12"
                role="img"
                viewBox="0 0 48 48"
                width="12"
              >
                <path d="M40 33.5c-.4 0-.8-.1-1.1-.4L24 18.1l-14.9 15c-.6.6-1.5.6-2.1 0s-.6-1.5 0-2.1l16-16c.6-.6 1.5-.6 2.1 0l16 16c.6.6.6 1.5 0 2.1-.3.3-.7.4-1.1.4z"></path>
              </svg>
            </button>
          </div>
          <p className={styles.postCount}>
            <strong>{readableNumber(user?.postCount)}</strong>{' '}
            {user?.postCount > 1 ? 'posts' : 'post'}
          </p>
          <button
            className={styles.followersCount}
            onClick={() => setOpenDialog(true)}
          >
            <strong>{readableNumber(user?.followers)}</strong>{' '}
            {user?.followers > 1 ? 'followers' : 'follower'}
          </button>

          {openDialog && <DialogSection setOpenDialog={setOpenDialog} />}
          <p className={styles.followingCount}>
            <strong>{readableNumber(user?.following)}</strong> following
          </p>
        </div>
        <div className={styles.postVideosTagged}>
          <Link shallow href={`/${user?.user_name}`}>
            <a
              className={cx(styles.link, {
                [styles.isSelected]: location.asPath === `/${user?.user_name}`,
              })}
            >
              <svg aria-label="" role="img" viewBox="0 0 48 48">
                <path
                  fill="currentColor"
                  clipRule="evenodd"
                  d="M45 1.5H3c-.8 0-1.5.7-1.5 1.5v42c0 .8.7 1.5 1.5 1.5h42c.8 0 1.5-.7 1.5-1.5V3c0-.8-.7-1.5-1.5-1.5zm-40.5 3h11v11h-11v-11zm0 14h11v11h-11v-11zm11 25h-11v-11h11v11zm14 0h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11zm14 28h-11v-11h11v11zm0-14h-11v-11h11v11zm0-14h-11v-11h11v11z"
                  fillRule="evenodd"
                ></path>
              </svg>
              <span className={styles.profileSectionLabel}>Posts</span>
            </a>
          </Link>
          <Link href={`/${user?.user_name}/channel`}>
            <a
              className={cx(styles.link, {
                [styles.isSelected]:
                  location.asPath === `/${user?.user_name}/channel`,
              })}
            >
              <svg aria-label="" role="img" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"
                ></path>
              </svg>
              <span className={styles.profileSectionLabel}>Videos</span>
            </a>
          </Link>
          <Link href={`/${user?.user_name}/tagged`}>
            <a
              className={cx(styles.link, {
                [styles.isSelected]:
                  location.asPath === `/${user?.user_name}/tagged`,
              })}
            >
              <svg role="img" viewBox="0 0 48 48">
                <path
                  fill="currentColor"
                  d="M41.5 5.5H30.4c-.5 0-1-.2-1.4-.6l-4-4c-.6-.6-1.5-.6-2.1 0l-4 4c-.4.4-.9.6-1.4.6h-11c-3.3 0-6 2.7-6 6v30c0 3.3 2.7 6 6 6h35c3.3 0 6-2.7 6-6v-30c0-3.3-2.7-6-6-6zm-29.4 39c-.6 0-1.1-.6-1-1.2.7-3.2 3.5-5.6 6.8-5.6h12c3.4 0 6.2 2.4 6.8 5.6.1.6-.4 1.2-1 1.2H12.1zm32.4-3c0 1.7-1.3 3-3 3h-.6c-.5 0-.9-.4-1-.9-.6-5-4.8-8.9-9.9-8.9H18c-5.1 0-9.4 3.9-9.9 8.9-.1.5-.5.9-1 .9h-.6c-1.7 0-3-1.3-3-3v-30c0-1.7 1.3-3 3-3h11.1c1.3 0 2.6-.5 3.5-1.5L24 4.1 26.9 7c.9.9 2.2 1.5 3.5 1.5h11.1c1.7 0 3 1.3 3 3v30zM24 12.5c-5.3 0-9.6 4.3-9.6 9.6s4.3 9.6 9.6 9.6 9.6-4.3 9.6-9.6-4.3-9.6-9.6-9.6zm0 16.1c-3.6 0-6.6-2.9-6.6-6.6 0-3.6 2.9-6.6 6.6-6.6s6.6 2.9 6.6 6.6c0 3.6-3 6.6-6.6 6.6z"
                ></path>
              </svg>
              <span className={styles.profileSectionLabel}>Tagged</span>
            </a>
          </Link>
        </div>

        <div className={styles.postsSection}>
          {user.posts?.map((post) => (
            <UserProfilePost
              post={post}
              location={location}
              user={user}
              key={post.user_id}
            />
          ))}
        </div>
        <div hidden={user.posts?.length > 0}>
          <div className={styles.emptyTaggedSection}>
            <div className={styles.iconSection}>
              <PhotoCameraFrontOutlined className={styles.profileIcon} />
            </div>
            <p className={styles.noPhotos}>No photos</p>
          </div>
        </div>
      </div>
    </>
  );
}
