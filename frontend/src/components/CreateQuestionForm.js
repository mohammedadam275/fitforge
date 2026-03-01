import React from "react";

function CreateQuestionForm({
  title,
  body,
  setTitle,
  setBody,
  onSubmit,
  posting,
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        marginBottom: "20px",
      }}
    >
      <h3>Ask a Question</h3>

      <input
        type="text"
        placeholder="Question title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "10px",
        }}
      />

      <textarea
        placeholder="Question details"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={{
          width: "100%",
          height: "80px",
          padding: "8px",
          marginBottom: "10px",
        }}
      />

      <button onClick={onSubmit} disabled={posting}>
        {posting ? "Posting..." : "Post Question"}
      </button>
    </div>
  );
}

export default CreateQuestionForm;