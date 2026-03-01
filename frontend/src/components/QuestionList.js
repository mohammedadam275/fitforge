import React from "react";

function QuestionList({
  questions,
  selectedQuestion,
  onSelectQuestion,
}) {
  if (questions.length === 0) {
    return <p>No questions in this category yet.</p>;
  }

  return (
    <>
      {questions.map((q) => (
        <div
          key={q._id}
          onClick={() => onSelectQuestion(q._id)}
          style={{
            border: "1px solid #ddd",
            padding: "15px",
            marginBottom: "10px",
            cursor: "pointer",
            background:
              selectedQuestion === q._id
                ? "#f5f5f5"
                : "white",
          }}
        >
          <h3>{q.title}</h3>
          <p>{q.body}</p>
          <small>By: {q.author?.username}</small>
        </div>
      ))}
    </>
  );
}

export default QuestionList;