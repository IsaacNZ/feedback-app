import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([
    {
      id: 1,
      rating: 10,
      text: 'Example Item 1',
    },
    {
      id: 2,
      rating: 6,
      text: 'Example Item 2',
    },
    {
      id: 3,
      rating: 4,
      text: 'Example Item 3',
    },
  ]);

  const [feedbackEdit, setFeedbackEdit] = useState({ item: {}, edit: false });

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  const deleteFeedback = (id) => {
    if (window.confirm('Delete this item?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const editFeedback = (item) => {
    setFeedbackEdit({ item, edit: true });
  };

  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    );
    setFeedbackEdit({
      item: {},
      edit: false,
    });
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        addFeedback,
        deleteFeedback,
        editFeedback,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
