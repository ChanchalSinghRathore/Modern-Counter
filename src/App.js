import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { Box, LinearProgress, Container, Typography, IconButton, Tooltip, TextField } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

const App = () => {
  const [count, setCount] = useState(0);
  const [initialSet, setInitialSet] = useState(false);
  const [initialInput, setInitialInput] = useState('');
  const [history, setHistory] = useState([0]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleIncrement = () => {
    if (count < 150) {
      const newCount = count + 1;
      const newHistory = history.slice(0, currentStep + 1);
      setHistory([...newHistory, newCount]);
      setCurrentStep(currentStep + 1);
      setCount(newCount);
    }
  };

  const handleDecrement = () => {
    if (count > 0) {
      const newCount = count - 1;
      const newHistory = history.slice(0, currentStep + 1);
      setHistory([...newHistory, newCount]);
      setCurrentStep(currentStep + 1);
      setCount(newCount);
    }
  };

  const handleUndo = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCount(history[currentStep - 1]);
    }
  };

  const handleRedo = () => {
    if (currentStep < history.length - 1) {
      setCurrentStep(currentStep + 1);
      setCount(history[currentStep + 1]);
    }
  };

  const handleInitialChange = (e) => {
    const value = Math.max(0, Math.min(150, Number(e.target.value))); // Ensure value is between 0 and 150
    setInitialInput(value);
  };

  const handleInitialSet = () => {
    setCount(initialInput);
    setHistory([initialInput]);
    setCurrentStep(0);
    setInitialSet(true);
  };

  if (!initialSet) {
    return (
      <Container maxWidth="sm">
        <Box textAlign="center" my={5}>
          <Typography variant="h4" gutterBottom>
            Set Initial Counter Value
          </Typography>
          <TextField
            type="number"
            value={initialInput}
            onChange={handleInitialChange}
            inputProps={{ min: 0, max: 150 }}
            label="Initial Value"
            variant="outlined"
            margin="normal"
          />
          <StyledButton variant="contained" color="primary" onClick={handleInitialSet}>
            Set Initial Value
          </StyledButton>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" my={5}>
        <Typography variant="h4" gutterBottom>
          Modern 
          Counter App
        </Typography>
        <Counter>
          <StyledButton variant="contained" color="secondary" onClick={handleDecrement}>
            -1
          </StyledButton>
          <CountDisplay>{count}</CountDisplay>
          <StyledButton variant="contained" color="primary" onClick={handleIncrement}>
            +1
          </StyledButton>
        </Counter>
        <ProgressBar variant="determinate" value={(count / 150) * 100} />
        <HistoryControls>
          <Tooltip title="Undo" aria-label="undo">
            <span>
              <IconButton onClick={handleUndo} disabled={currentStep === 0}>
                <UndoIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Redo" aria-label="redo">
            <span>
              <IconButton onClick={handleRedo} disabled={currentStep === history.length - 1}>
                <RedoIcon />
              </IconButton>
            </span>
          </Tooltip>
        </HistoryControls>
      </Box>
    </Container>
  );
};

export default App;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const CountDisplay = styled.span`
  font-size: 2.5rem;
  margin: 0 20px;
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  && {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 1.2rem;
  }
`;

const ProgressBar = styled(LinearProgress)`
  && {
    width: 100%;
    height: 20px;
    border-radius: 10px;
    margin: 20px 0;
    background-color: #e0e0e0;
    & .MuiLinearProgress-bar {
      background-color: #4caf50;
    }
  }
`;

const HistoryControls = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  & > span {
    margin: 0 10px;
  }
`;
