import React from "react";
import { useState } from "react";

import { TransitionGroup } from "react-transition-group";
import { Box, Stack, Button, TextField, Typography, Radio, Collapse, IconButton } from "@mui/material";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import _cloneDeep from "lodash/cloneDeep";

import "./App.css";

const initQuestion = {
  questionDetailName: "",
  questions: [
    {
      questionName: "",
      choices: [
        {
          isCorrect: true,
          questionDes: "",
        },
      ],
    },
  ],
};

export function App() {
  const [questionDetail, setQuestionDetail] = useState(initQuestion);
  const [isValidate, setIsValidate] = useState(false);

  console.log("detail: ", questionDetail);

  const questionD = (e) => {
    setQuestionDetail((prev) => {
      const question = _cloneDeep(prev);
      question.questionDetailName = e;
      return question;
    });
  };

  const addQuestion = () => {
    setQuestionDetail((prev) => {
      const newObj = _cloneDeep(prev);

      newObj.questions.push(initQuestion.questions[0]);

      return newObj;
    });
  };

  const removeQuestion = (index) => {
    setQuestionDetail((prev) => {
      const delq = _cloneDeep(prev);
      delq.questions.splice(index, 1);
      return delq;
    });
  };

  const questionCall = (e, i) => {
    setQuestionDetail((prev) => {
      const questionC = _cloneDeep(prev);
      questionC.questions[i].questionName = e;

      return questionC;
    });
  };

  const addChoice = (index) => {
    setQuestionDetail((prev) => {
      const newChoice = _cloneDeep(prev);
      newChoice.questions[index].choices.push({
        isCorrect: false,
        questionDes: "",
      });

      return newChoice;
    });
  };

  const removeChoice = (i, index) => {
    setQuestionDetail((prev) => {
      const delChoice = _cloneDeep(prev);
      delChoice.questions[i].choices.splice(index, 1);

      return delChoice;
    });
  };

  const choiceCall = (e, i, index) => {
    setQuestionDetail((prev) => {
      const choiceC = _cloneDeep(prev);
      choiceC.questions[i].choices[index].questionDes = e;

      return choiceC;
    });
  };

  const dupButton = (i) => {
    // console.log(questionDetail.questions[i]);
    setQuestionDetail((prev) => {
      const dup = _cloneDeep(prev);
      dup.questions.push(questionDetail.questions[i]);
      return dup;
    });
  };

  const resetButton = () => {
    setQuestionDetail(initQuestion);
    setIsValidate(false);
  };

  const handleChange = (i, index) => {
    setQuestionDetail((prev) => {
      const change = _cloneDeep(prev);
      for (var j = 0; j < change.questions[i].choices.length; j++) {
        if (j === index) {
          // true
          change.questions[i].choices[j].isCorrect = true;
        } else {
          // false
          change.questions[i].choices[j].isCorrect = false;
        }
      }
      return change;
    });
  };

  const saveButton = () => {
    setIsValidate(true);
  };

  return (
    <div className="bgAll">
      <div className="qn">
        <Box borderBottom="1px solid #B7B7B8" background="#fff">
          <Typography className="head"> 🦊 Foxbith Questionaire</Typography>
        </Box>

        <Stack spacing={1} direction="row" className="button">
          <Button
            variant="outlined"
            color="warning"
            onClick={() => resetButton()}
          >
            CANCEL
          </Button>
          <Button
            variant="contained"
            color="warning"
            className="saveButton"
            onClick={saveButton}
          >
            SAVE
          </Button>
        </Stack>

        <Box padding="20px" display="flex">
          <div className="qBg">
            <p fontWeight="bold">Questionnaire Detail</p>
            <TextField
              id="outlined-basic"
              label="Name*"
              variant="outlined"
              onChange={(e) => questionD(e.target.value)}
              value={questionDetail.questionDetailName}
              helperText={
                isValidate &&
                !questionDetail.questionDetailName &&
                "please enter question name"
              }
              error={isValidate && !questionDetail.questionDetailName}
            />
          </div>
        </Box>
      </div>

      <TransitionGroup>
        {questionDetail.questions.map((question, i) => (
          <Collapse key={i}>
            <div className="question" key={i}>
              <Box padding="20px" paddingTop="0px" display="flex">
                <div className="qBg">
                  <p>Question {i + 1}</p>
                  <Box>
                    <div className="questionName">
                      <TextField
                        fullWidth
                        id="outlined-basic"
                        label="Question*"
                        variant="outlined"
                        onChange={(e) => questionCall(e.target.value, i)}
                        value={question.qustionName}
                        helperText={
                          isValidate &&
                          !questionDetail.questions[i].questionName &&
                          "please enter question"
                        }
                        error={
                          isValidate &&
                          !questionDetail.questions[i].questionName
                        }
                      />
                      <Box>
                        <TransitionGroup>
                          {questionDetail.questions[i].choices.map(
                            (choice, index) => (
                              <Collapse key={index}>
                                <div>
                                  {
                                    <div className="choice">
                                      <Radio
                                        sx={{ padding: "8px", margin: 0, marginBottom: choice.isCorrect ? "20px" : "0px", }}
                                        onChange={() => handleChange(i, index)}
                                        checked={choice.isCorrect}
                                      />
                                      <TextField
                                        className="checkInput"
                                        fullWidth
                                        padding="50px"
                                        id="outlined-basic"
                                        label="Description*"
                                        variant="outlined"
                                        onChange={(e) =>
                                          choiceCall(e.target.value, i, index)
                                        }
                                        value={choice.questionDes}
                                        helperText={
                                          (choice.isCorrect &&
                                            "This answer is correct") ||
                                          (isValidate &&
                                            !questionDetail.questions[i]
                                              .choices[index].questionDes &&
                                            "please enter description")
                                        }
                                        error={
                                          isValidate &&
                                          !questionDetail.questions[i].choices[
                                            index
                                          ].questionDes
                                        }
                                      />
                                      <IconButton
                                        className="delBtn"
                                        sx={{ padding: "8px", margin: 0, marginBottom: choice.isCorrect ? "20px" : "0px", }}                                        
                                        onClick={() => removeChoice(i, index)}
                                      >
                                        <DeleteOutlineIcon />
                                      </IconButton>
                                    </div>
                                  }
                                </div>
                              </Collapse>
                            )
                          )}
                        </TransitionGroup>
                      </Box>
                      {/* ---- choice ---- */}

                      <div>
                        <Button
                          variant="text"
                          className="addBtn"
                          startIcon={<AddIcon />}
                          onClick={() => addChoice(i)}
                        >
                          <p> ADD CHOICE </p>
                        </Button>
                      </div>

                      <div>
                        <Button
                          variant="text"
                          className="copy"
                          startIcon={<ContentCopyIcon />}
                          onClick={() => dupButton(i)}
                        >
                          DUPLICATE
                        </Button>

                        <Button
                          variant="text"
                          className="del"
                          startIcon={<DeleteOutlineIcon />}
                          onClick={() => removeQuestion(i)}
                        >
                          DELETE
                        </Button>
                      </div>
                    </div>
                    {/* ---- questionName ---- */}
                  </Box>
                </div>
                {/* ---- qBg ---- */}
              </Box>
            </div>
          </Collapse>
        ))}
        {/* ---- question ---- */}
        </TransitionGroup>

        <Box padding="20px" paddingTop="0px" display="flex">
          <div className="qBg">
            <Button
              variant="outlined"
              color="warning"
              onClick={() => addQuestion()}
            >
              <AddIcon />
              Add Question
            </Button>
          </div>
        </Box>
    </div>
    // ---- bgAll ----
  );
}

export default App;
