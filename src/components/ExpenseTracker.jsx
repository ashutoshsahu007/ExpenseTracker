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
import { activatePremium, toggleTheme } from "../store/themeSlice.jsx";
import {
  Wallet,
  PlusCircle,
  FileDown,
  Moon,
  Sun,
  Edit,
  Trash,
} from "lucide-react";

export default function ExpenseTracker() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Food");

  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.expenses.list);
  const editId = useSelector((state) => state.expenses.editId);
  const totalExpenses = useSelector(selectTotalExpenses);

  const { darkMode, premiumActivated } = useSelector((state) => state.theme);

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

  const handleDownloadCSV = () => {
    if (expenses.length === 0) {
      alert("No expenses to download!");
      return;
    }

    // CSV header
    let csv = "Description,Category,Amount\n";

    // Add each expense row
    expenses.forEach((exp) => {
      csv += `${exp.description},${exp.category},${exp.amount}\n`;
    });

    // Create a blob and download
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv"; // file name
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen py-10 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 flex flex-col items-center justify-start px-4 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-200 to-blue-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Expense Card */}
      <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 w-full max-w-md border border-white/20 relative z-10">
        <form onSubmit={handleAddExpense} className="space-y-4">
          <input
            type="number"
            placeholder="Money Spent"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full pl-4 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full pl-4 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full pl-4 pr-4 py-3.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 bg-gray-50/50 hover:bg-white"
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl py-3.5 font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            {editId ? "Update Expense" : "Add Expense"}
            <PlusCircle className="w-4 h-4" />
          </button>
        </form>

        {/* Premium + Theme */}
        {totalExpenses > 10000 && (
          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={() => dispatch(activatePremium())}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl py-3 font-semibold transition-all duration-200 shadow-lg cursor-pointer"
            >
              Activate Premium
            </button>

            {premiumActivated && (
              <button
                onClick={() => dispatch(toggleTheme())}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl py-3 font-semibold transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                {darkMode ? (
                  <>
                    <Sun className="w-5 h-5" /> Switch to Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-5 h-5" /> Switch to Dark Mode
                  </>
                )}
              </button>
            )}
          </div>
        )}

        {expenses.length > 0 && (
          <div className="mt-4">
            <button
              onClick={handleDownloadCSV}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl py-3 font-semibold transition-all duration-200 shadow-lg cursor-pointer flex items-center justify-center gap-2"
            >
              <FileDown className="w-5 h-5" /> Download CSV
            </button>
          </div>
        )}
      </div>

      {/* Expense List */}
      <div className="mt-8 w-full max-w-md relative z-10">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Your Expenses
        </h2>

        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses yet.</p>
        ) : (
          <ul className="space-y-3">
            {expenses.map((exp) => (
              <li
                key={exp.id}
                className="p-4 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl shadow flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{exp.description}</p>
                  <p className="text-sm text-gray-500">{exp.category}</p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-indigo-600">₹{exp.amount}</p>
                  <button
                    onClick={() => handleEditExpense(exp)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded-lg hover:bg-yellow-600 cursor-pointer flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(exp.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-lg hover:bg-red-600 cursor-pointer flex items-center gap-1"
                  >
                    <Trash className="w-4 h-4" /> Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
