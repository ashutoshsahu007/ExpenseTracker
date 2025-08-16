import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExpenses,
  addExpense,
  updateExpense,
  deleteExpense,
  setEditId,
  clearEditId,
  selectTotalExpenses,
} from "../store/expenseSlice.jsx";

export default function ExpenseTracker() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.list);
  const editId = useSelector((state) => state.expenses.editId);

  const totalExpenses = useSelector(selectTotalExpenses);

  const categories = ["Food", "Petrol", "Salary", "Shopping", "Travel"];
  const FIREBASE_BASE_URL =
    "https://expensetracker-4b1e4-default-rtdb.firebaseio.com/expenses";

  // Fetch expenses
  useEffect(() => {
    async function fetchExpenses() {
      try {
        const res = await fetch(`${FIREBASE_BASE_URL}.json`);
        const data = await res.json();
        if (data) {
          const loaded = Object.entries(data).map(([id, exp]) => ({
            id,
            ...exp,
          }));
          dispatch(setExpenses(loaded.reverse()));
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchExpenses();
  }, [dispatch]);

  // Add / Update expense
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!amount || !description) return;
    const expenseData = { amount, description, category };

    try {
      if (editId) {
        // UPDATE
        await fetch(`${FIREBASE_BASE_URL}/${editId}.json`, {
          method: "PUT",
          body: JSON.stringify(expenseData),
          headers: { "Content-Type": "application/json" },
        });
        dispatch(updateExpense({ id: editId, data: expenseData }));
        dispatch(clearEditId());
      } else {
        // CREATE
        const res = await fetch(`${FIREBASE_BASE_URL}.json`, {
          method: "POST",
          body: JSON.stringify(expenseData),
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        dispatch(addExpense({ id: data.name, ...expenseData }));
      }

      setAmount("");
      setDescription("");
      setCategory("Food");
    } catch (err) {
      console.error(err);
    }
  };

  // Delete expense
  const handleDeleteExpense = async (id) => {
    try {
      await fetch(`${FIREBASE_BASE_URL}/${id}.json`, { method: "DELETE" });
      dispatch(deleteExpense(id));
    } catch (err) {
      console.error(err);
    }
  };

  // Edit expense
  const handleEditExpense = (exp) => {
    setAmount(exp.amount);
    setDescription(exp.description);
    setCategory(exp.category);
    dispatch(setEditId(exp.id));
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
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
          >
            {editId ? "Update Expense" : "Add Expense"}
          </button>
        </form>

        {totalExpenses > 10000 && (
          <div className="mt-4 text-center">
            <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
              Activate Premium
            </button>
          </div>
        )}

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
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-blue-500">₹{exp.amount}</p>
                    <button
                      onClick={() => handleEditExpense(exp)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteExpense(exp.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
