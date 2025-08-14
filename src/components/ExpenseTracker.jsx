import { useState, useEffect } from "react";

export default function ExpenseTracker() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");
  const [expenses, setExpenses] = useState([]);

  const categories = ["Food", "Petrol", "Salary", "Shopping", "Travel"];

  const FIREBASE_URL =
    "https://expensetracker-4b1e4-default-rtdb.firebaseio.com/expenses.json";

  // Fetch expenses from Firebase on page load
  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await fetch(FIREBASE_URL);
        if (!res.ok) throw new Error("Failed to fetch expenses");
        const data = await res.json();

        if (data) {
          const loadedExpenses = Object.entries(data).map(([id, exp]) => ({
            id,
            ...exp,
          }));
          setExpenses(loadedExpenses.reverse()); // newest first
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchExpenses();
  }, []);

  // Add expense to Firebase
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newExpense = { amount, description, category };

    try {
      const res = await fetch(FIREBASE_URL, {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to add expense");

      const data = await res.json();
      setExpenses([{ id: data.name, ...newExpense }, ...expenses]);

      setAmount("");
      setDescription("");
      setCategory("Food");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Expense Tracker</h1>

        {/* Expense Form */}
        <form
          onSubmit={handleAddExpense}
          className="bg-white p-4 rounded shadow space-y-4"
        >
          <input
            type="number"
            placeholder="Money Spent"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border rounded px-3 py-2 outline-none focus:ring focus:ring-blue-200"
            required
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2 outline-none focus:ring focus:ring-blue-200"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded px-3 py-2 outline-none focus:ring focus:ring-blue-200"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            Add Expense
          </button>
        </form>

        {/* Expense List */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-3">Your Expenses</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-500">No expenses yet.</p>
          ) : (
            <ul className="space-y-3">
              {expenses.map((exp) => (
                <li
                  key={exp.id}
                  className="bg-white p-3 rounded shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium">{exp.description}</p>
                    <p className="text-sm text-gray-500">{exp.category}</p>
                  </div>
                  <p className="font-bold text-blue-500">₹{exp.amount}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
