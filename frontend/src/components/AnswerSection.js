import React from "react";

function AnswerSection({
  answers,
  newAnswer,
  setNewAnswer,
  onSubmitAnswer,
  posting,
}) {
  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Answers</h2>

      <div style={{ marginBottom: "20px" }}>
        <textarea
          placeholder="Write your answer..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          style={{
            width: "100%",
            height: "80px",
            padding: "8px",
            marginBottom: "10px",
          }}
        />

        <button onClick={onSubmitAnswer} disabled={posting}>
          {posting ? "Submitting..." : "Submit Answer"}
        </button>
      </div>

      {answers.length === 0 && <p>No answers yet.</p>}

      {answers.map((a) => (
        <div
          key={a._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "8px",
          }}
        >
          <p>{a.body}</p>
          <small>By: {a.author?.username}</small>
        </div>
      ))}
    </div>
  );
}

export default AnswerSection;