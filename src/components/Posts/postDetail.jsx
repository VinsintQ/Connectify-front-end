import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import postService from "../../services/postService";
import CommentForm from "../commentForm/commentForm";
import { useNavigate } from "react-router-dom";
import "./postDetail.css";

const PostDetails = ({ user }) => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [showPostModal, setShowPostModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();
  const userId = user._id;

  const deletePost = () => setShowPostModal(true);

  const handlePostModalClose = () => setShowPostModal(false);

  const handleConfirmDeletePost = async () => {
    await postService.deleter(userId, postId);
    navigate("/");
  };

  const deleteComment = (commentId) => {
    setCommentToDelete(commentId);
    setShowCommentModal(true);
  };

  const handleCommentModalClose = () => {
    setShowCommentModal(false);
    setCommentToDelete(null);
  };

  const handleConfirmDeleteComment = async () => {
    if (commentToDelete) {
      await postService.deleteComment(userId, postId, commentToDelete);
      setRefresh((prev) => !prev);
      handleCommentModalClose();
    }
  };

  const handleLike = async () => {
    const liked = post?.like?.find((like) => like.userid === userId);
    const disliked = post?.disLike?.find((dislike) => dislike.userid === userId);

    if (liked) {
      // Remove like if already liked
      await postService.rmLike(userId, postId, liked._id);
    } else {
      // Add like if not liked yet
      await postService.like(userId, postId);
    }

    // If post is disliked, remove the dislike
    if (disliked) {
      await postService.rmDislike(userId, postId, disliked._id);
    }

    setRefresh((prev) => !prev);
  };

  const handleDislike = async () => {
    const disliked = post?.disLike?.find((dislike) => dislike.userid === userId);
    const liked = post?.like?.find((like) => like.userid === userId);

    if (disliked) {
      // Remove dislike if already disliked
      await postService.rmDislike(userId, postId, disliked._id);
    } else {
      // Add dislike if not disliked yet
      await postService.dislike(userId, postId);
    }

    // If post is liked, remove the like
    if (liked) {
      await postService.rmLike(userId, postId, liked._id);
    }

    setRefresh((prev) => !prev);
  };

  useEffect(() => {
    async function getPost() {
      const postData = await postService.indexc(userId, postId);
      setPost(postData);
    }
    getPost();
  }, [postId, refresh]);

  const handleCommentAdded = () => {
    setRefresh((prev) => !prev);
  };

  if (!post) {
    return (
      <main>
        <h3>Loading...</h3>
      </main>
    );
  }

  return (
    <div className="post-details-container">
      <div className="user-profile">
        <Link to={`/profile/${post.userId._id}`}>
          <img src={post.userId?.image} alt="User profile photo" />
          {post.userId.username}
        </Link>
      </div>

      <img src={post?.image} alt="post image" className="posty-image" />
      <p className="post-content">Content: {post?.content}</p>

      <div className="reaction-buttons">
        <button
          className={
            post?.like?.some((like) => like.userid === userId) ? "clicked" : "like-button"
          }
          onClick={handleLike}
        >
          <FaThumbsUp /> <span>{post?.like?.length || 0}</span>
        </button>

        <button
          className={
            post?.disLike?.some((dislike) => dislike.userid === userId) ? "clicked" : "like-button"
          }
          onClick={handleDislike}
        >
          <FaThumbsDown /> <span>{post?.disLike?.length || 0}</span>
        </button>
      </div>

      {post.userId._id === user._id && (
        <div className="flex">
          <button id="editButton">
            <Link to={`/post/${postId}/update`}>Edit</Link>
          </button>
          <button className="red" onClick={deletePost}>Delete</button>
        </div>
      )}

      <Modal show={showPostModal} onHide={handlePostModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlePostModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmDeletePost}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="comments-section">
        <CommentForm
          postId={postId}
          user={user}
          onCommentAdded={handleCommentAdded}
        />

        {post.comments.length === 0 ? (
          <p>There are no comments.</p>
        ) : (
          post.comments.map((comment) => (
            <div key={comment._id} className="comment">
              <form action="" id={comment._id}>
                <p>
                  <Link to={`/profile/${comment.userid._id}`}>
                    <img src={comment.userid?.image} alt="User profile photo" />
                    {comment.userid.username}
                  </Link>
                  : {comment.message}
                </p>
                {comment.userid._id === user._id && (
                  <button
                    type="button"
                    className="delete-comment-button"
                    onClick={() => deleteComment(comment._id)}
                  >
                    Delete
                  </button>
                )}
              </form>
            </div>
          ))
        )}
      </div>

      <Modal show={showCommentModal} onHide={handleCommentModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCommentModalClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            onClick={handleConfirmDeleteComment}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PostDetails;
