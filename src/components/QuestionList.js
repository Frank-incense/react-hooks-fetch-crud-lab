import React from "react";
import QuestionItem from "./QuestionItem";


function QuestionList({questions, handleDelete, handleUpdate}) {
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {/* display QuestionItem components here after fetching */}
        {
          questions.map(question=>{
            return <QuestionItem 
                    key={question.id}
                    question={question} 
                    onDeleteQuestion={handleDelete} 
                    onUpdateAnswer={handleUpdate}/>
          })
        }
      </ul>
    </section>
  );
}

export default QuestionList;
