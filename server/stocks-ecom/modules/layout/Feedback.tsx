import React, { useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import { updateFeedbackDialogState } from './redux/layout.action';
import { feedbackService } from './shared/layoutServices';

function Feedback() {
  const feedbackOpenState = useSelector((state) => state.layoutState.feedbackOpenState);
  const dispatch = useDispatch();
  const [feedbackContent, setFeedbackContent] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleClose = () => {
    dispatch(updateFeedbackDialogState(false));
  };

  const submitFeedback = async () => {
    if (isLoading) {
      return;
    }
    try {
      setIsLoading(true);
      await feedbackService({ feedback: feedbackContent });
      handleClose();
    } catch (e) {
      // do nothing
    }
    setIsLoading(false);
  };

  return (
    <>
      <Dialog open={feedbackOpenState} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Feedback</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide your feedback to help us improve.
          </DialogContentText>
          <TextField
            autoFocus
            multiline
            onChange={((event) => setFeedbackContent(event.target.value))}
            rows={5}
            margin="dense"
            id="name"
            label="Feedback"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={submitFeedback} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default Feedback;
