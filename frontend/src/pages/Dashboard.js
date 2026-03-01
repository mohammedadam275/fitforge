import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";

import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import CreateQuestionForm from "../components/CreateQuestionForm";
import QuestionList from "../components/QuestionList";
import AnswerSection from "../components/AnswerSection";

function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  // Data State
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);

  // Form State
  const [newQuestionTitle, setNewQuestionTitle] = useState("");
  const [newQuestionBody, setNewQuestionBody] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Loading State
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingAnswers, setLoadingAnswers] = useState(false);
  const [postingQuestion, setPostingQuestion] = useState(false);
  const [postingAnswer, setPostingAnswer] = useState(false);

  // Error State
  const [categoryError, setCategoryError] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [postQuestionError, setPostQuestionError] = useState("");
  const [postAnswerError, setPostAnswerError] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        setCategoryError("");
        const res = await API.get("/categories");
        setCategories(res.data);
      } catch (err) {
        setCategoryError("Failed to load categories.");
      } finally {
        setLoadingCategories(false);
      }
    };

    loadCategories();
  }, []);

  const fetchQuestions = async (categoryId) => {
    try {
      setLoadingQuestions(true);
      setQuestionError("");
      const res = await API.get(`/questions/category/${categoryId}`);
      setQuestions(res.data);
      setSelectedCategory(categoryId);
      setSelectedQuestion(null);
      setAnswers([]);
    } catch (err) {
      setQuestionError("Failed to load questions.");
    } finally {
      setLoadingQuestions(false);
    }
  };

  const fetchAnswers = async (questionId) => {
    try {
      setLoadingAnswers(true);
      setAnswerError("");
      const res = await API.get(`/answers/question/${questionId}`);
      setAnswers(res.data);
      setSelectedQuestion(questionId);
    } catch (err) {
      setAnswerError("Failed to load answers.");
    } finally {
      setLoadingAnswers(false);
    }
  };

  const handleCreateQuestion = async () => {
    if (!newQuestionTitle.trim() || !newQuestionBody.trim()) {
      setPostQuestionError("Both title and body are required.");
      return;
    }

    try {
      setPostingQuestion(true);
      setPostQuestionError("");

      await API.post("/questions", {
        title: newQuestionTitle,
        body: newQuestionBody,
        categoryId: selectedCategory,
      });

      setNewQuestionTitle("");
      setNewQuestionBody("");
      fetchQuestions(selectedCategory);
    } catch (err) {
      setPostQuestionError("Failed to create question.");
    } finally {
      setPostingQuestion(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!newAnswer.trim()) {
      setPostAnswerError("Answer cannot be empty.");
      return;
    }

    try {
      setPostingAnswer(true);
      setPostAnswerError("");

      await API.post("/answers", {
        body: newAnswer,
        questionId: selectedQuestion,
      });

      setNewAnswer("");
      fetchAnswers(selectedQuestion);
    } catch (err) {
      setPostAnswerError("Failed to submit answer.");
    } finally {
      setPostingAnswer(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {loadingCategories ? (
        <div style={{ padding: "20px" }}>
          Loading categories...
        </div>
      ) : categoryError ? (
        <div style={{ color: "red", padding: "20px" }}>
          {categoryError}
        </div>
      ) : (
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={fetchQuestions}
        />
      )}

      <div style={{ flex: 1, padding: "40px" }}>
        <TopBar user={user} onLogout={handleLogout} />

        {!selectedCategory && (
          <p>Select a category to view questions.</p>
        )}

        {selectedCategory && (
          <>
            {postQuestionError && (
              <p style={{ color: "red" }}>
                {postQuestionError}
              </p>
            )}

            <CreateQuestionForm
              title={newQuestionTitle}
              body={newQuestionBody}
              setTitle={setNewQuestionTitle}
              setBody={setNewQuestionBody}
              onSubmit={handleCreateQuestion}
              posting={postingQuestion}
            />

            {loadingQuestions ? (
              <p>Loading questions...</p>
            ) : questionError ? (
              <p style={{ color: "red" }}>
                {questionError}
              </p>
            ) : (
              <QuestionList
                questions={questions}
                selectedQuestion={selectedQuestion}
                onSelectQuestion={fetchAnswers}
              />
            )}

            {selectedQuestion && (
              loadingAnswers ? (
                <p>Loading answers...</p>
              ) : answerError ? (
                <p style={{ color: "red" }}>
                  {answerError}
                </p>
              ) : (
                <>
                  {postAnswerError && (
                    <p style={{ color: "red" }}>
                      {postAnswerError}
                    </p>
                  )}

                  <AnswerSection
                    answers={answers}
                    newAnswer={newAnswer}
                    setNewAnswer={setNewAnswer}
                    onSubmitAnswer={handleSubmitAnswer}
                    posting={postingAnswer}
                  />
                </>
              )
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;