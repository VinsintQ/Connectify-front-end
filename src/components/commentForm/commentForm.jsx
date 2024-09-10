import { useState, useEffect } from 'react';

import postService from '../../services/postService';
const CommentForm = ({postId , user,onCommentAdded}) => {
  const [formData, setFormData] = useState({ message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsSubmitting(true); // Disable submit button while submitting

    try {
      // Wait for the comment to be created
      await postService.createComment(user._id, postId, formData);

      // Clear the form
      setFormData({ message: '' });

      // Trigger the parent callback to refresh the comments
      onCommentAdded();
    } catch (error) {
      console.error('Error creating comment:', error);
    } finally {
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="comment-form-container">
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="form-group">
        <label htmlFor="message-input">Comment:</label>
      <textarea
        required
        type="message"
        name="message"
        id="message-input"
        value={formData.message}
        onChange={handleChange}
        className="comment-textarea"
      />
      </div>
      <button type="submit" className='submit-comment-btn'>SUBMIT COMMENT</button>
    </form>
    </div>
  );
};

export default CommentForm;