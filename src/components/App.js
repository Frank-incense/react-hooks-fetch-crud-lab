import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

export const API_URL = "http://localhost:4000/questions";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);
  
  useEffect(()=>{
    fetch(API_URL)
    .then(r => r.json())
    .then(json => setQuestions(json))
  },[])

  // Callback function updating new questions
  function handleNewQuestion(newQuestion){
    setQuestions([...questions, newQuestion])
  }

  // Callback function to handle deleting a Quesiton
  function handleDeleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter(question=>question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  // Callback function to handle updated correct answer values
  function handleUpdate(correctAnswer){
    const corrected = questions.map((question)=>{
      if (question.id === correctAnswer.id) return correctAnswer
      else return question
    })
    setQuestions(corrected)
  }
  
  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" 
      ? <QuestionForm 
        onQuestionSubmit={handleNewQuestion}/> 
      : <QuestionList 
        handleUpdate={handleUpdate}
        handleDelete={handleDeleteQuestion} 
        questions={questions}/>}
        
    </main>
  );
}

export default App;
