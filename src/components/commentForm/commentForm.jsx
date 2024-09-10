import { useState, useEffect } from 'react';

import postService from '../../services/postService';
const CommentForm = ({postId , user}) => {
  const [formData, setFormData] = useState({ message: '' });

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    // handleAddComment
    setFormData({ message: '' });
    // handleAddComment(formData)

    postService.createComment(user._id,postId,formData)
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