import React, { useState } from "react";
import { API_URL } from "./App";

function QuestionItem({ question, onDeleteQuestion, onUpdateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;
  const [updatedAnswer, setAnswer] = useState(correctIndex)

  function deleteQuestion(){
    fetch(`${API_URL}/${question.id}`, {
      method: "DELETE"
    })
    .then(r => r.json())
    .then(() => {
      onDeleteQuestion(question)
    }) 
     
  }

  // Update the value of the correct answer using a callback
  function handleUpdate(e){
    setAnswer(e.target.value)
    fetch(`${API_URL}/${question.id}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({correctIndex: e.target.value})
    })
    .then(r => r.json())
    .then(data => {      
      onUpdateAnswer(data)
    })
    
  }

  const options = answers.map((answer, index) => (
    <option key={index} value={index} >
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleUpdate} value={updatedAnswer}>{options}</select>
      </label>
      <button onClick={deleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
