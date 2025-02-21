import { openDB } from "idb";

// Initialize IndexedDB
const initDB = async () => {
  return openDB("QuizAppDB", 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("quizHistory")) {
        db.createObjectStore("quizHistory", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    },
  });
};

// Save Quiz Result
export const saveQuizResult = async (score) => {
  const db = await initDB();
  const tx = db.transaction("quizHistory", "readwrite");
  const store = tx.objectStore("quizHistory");
  await store.add({ score, date: new Date().toISOString() });
  await tx.done;
};

// Get Quiz History
export const getQuizHistory = async () => {
  const db = await initDB();
  return db.getAll("quizHistory");
};
