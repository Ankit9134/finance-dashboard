import React, { useState, useEffect } from 'react';
import { Search, ChevronUp, ChevronDown, Edit2, Trash2, X, Plus } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/helpers';
import { useAppContext } from '../context/AppContext';

const Transactions = () => {
  const {
    role,
    filters,
    setFilters,
    getFilteredTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
  } = useAppContext();

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    date: '',
    description: '',
    category: '',
    amount: '',
    type: 'expense',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const handler = () => setShowAddForm(true);
    window.addEventListener('openAddTransactionModal', handler);
    return () => window.removeEventListener('openAddTransactionModal', handler);
  }, []);
  const today = new Date().toISOString().split('T')[0];

  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: '',
    date: today,
    type: 'expense',
  });

  const transactions = getFilteredTransactions();

  const handleSort = (key) => {
    setFilters({
      ...filters,
      sortBy: key,
      sortOrder: filters.sortBy === key && filters.sortOrder === 'asc' ? 'desc' : 'asc',
    });
  };

  const [showEditModal, setShowEditModal] = useState(false);

  const handleEdit = (transaction) => {
    if (role !== 'admin') return;
    setEditingId(transaction.id);
    setEditForm({
      date: transaction.date || '',
      description: transaction.description || '',
      category: transaction.category || '',
      amount: transaction.amount || '',
      type: transaction.type || 'expense',
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    updateTransaction(editingId, {
      ...editForm,
      amount: parseFloat(editForm.amount) || 0,
    });
    setEditingId(null);
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    if (role !== 'admin') return;
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const handleAddTransaction = () => {
    if (!newTransaction.description || !newTransaction.amount || !newTransaction.category || !newTransaction.date) {
      alert('Please fill all fields');
      return;
    }
    addTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    });
    setNewTransaction({
      description: '',
      amount: '',
      category: '',
      date: today,
      type: 'expense',
    });
    setShowAddForm(false);
  };

  const SortIcon = ({ column }) => {
    if (filters.sortBy !== column) return <ChevronUp className="w-4 h-4 " />;
    return filters.sortOrder === 'asc' ?
      <ChevronUp className="w-4 h-4" /> :
      <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg inset-ring overflow-hidden">
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Transactions
          </h2>
          <div className="flex gap-3">
            {role === 'admin' && (
              <div className="relative">
                <button
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Transaction
                </button>

              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 border border-gray-400 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            className="px-4 py-2 w-32 lg:w-40 border border-gray-400 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="all">All Types</option>
            <option value="income">Income Only</option>
            <option value="expense">Expenses Only</option>
          </select>

          <input
            type="month"
            value={filters.month}
            onChange={(e) => setFilters({ ...filters, month: e.target.value })}
            className="px-4 py-2 border border-gray-400 w-32 lg:w-40 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] table-auto">
          <thead className="bg-gray-800 dark:bg-gray-700">
            <tr>
              <th className="lg:px-6 px-3 py-3 w-36 text-left text-xs items-center font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 "
                onClick={() => handleSort('date')}>
                <div className="flex items-center gap-2">
                  Date    <SortIcon column="date" />
                </div>
              </th>
              <th className="lg:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors "
                onClick={() => handleSort('description')}>
                <div className="flex items-center gap-2">
                  Description <SortIcon column="description" />
                </div>
              </th>
              <th className="lg:px-6 px-3 py-3  text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                onClick={() => handleSort('category')}>
                <div className="flex items-center gap-2">
                  Category <SortIcon column="category" />
                </div>
              </th>
              <th className="lg:px-6 px-3 py-3  text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                onClick={() => handleSort('amount')}>
                <div className="flex items-center gap-2">
                  Amount <SortIcon column="amount" />
                </div>
              </th>
              <th className="lg:px-6 px-3 py-3  text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:text-blue-600 dark:hover:text-blue-500 transition-colors"
                onClick={() => handleSort('type')}>
                <div className="flex items-center gap-2">
                  Type <SortIcon column="type" />
                </div>
              </th>
              {role === 'admin' && (
                <th className="lg:px-6 px-3 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 px-1">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' ? 5 : 4} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400 ">
                  No transactions found
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <td className="lg:px-6 px-3 py-4 text-sm text-gray-900 dark:text-white">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="lg:px-6 px-3 py-4 text-sm text-gray-900 dark:text-white">
                    {transaction.description}
                  </td>
                  <td className="lg:px-6 px-3 py-4 text-sm text-gray-900 dark:text-whit">
                    
                      {transaction.category}
                  
                  </td>
                  <td className="lg:px-6 px-3 py-4 text-sm">
                    <span className={transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(parseFloat(transaction.amount) || 0)}
                    </span>
                  </td>
                  <td className="lg:px-6 px-3 py-4 text-sm text-gray-900 dark:text-white">
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </td>
                  {role === 'admin' && (
                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button onClick={() => handleEdit(transaction)} className="text-blue-600 hover:text-blue-700">
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDelete(transaction.id)} className="text-red-600 hover:text-red-700">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showAddForm && (
         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowAddForm(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-white">Add Transaction</h3>
            <button onClick={() => setShowAddForm(false)}>
              <X className="w-4 h-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
            </button>
          </div>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Description"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Amount"
              value={newTransaction.amount}
              onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newTransaction.date}
              onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newTransaction.type}
              onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
            <div className="flex gap-2 pt-1">
              <button
                onClick={handleAddTransaction}
                className="flex-1 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Add
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
          </div>
          </div>
        
      )}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setShowEditModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Transaction</h3>
              <button onClick={() => setShowEditModal(false)}>
                <X className="w-5 h-5 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Date</label>
                <input type="date" value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Description</label>
                <input type="text" value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Category</label>
                <input type="text" value={editForm.category}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Amount</label>
                <input type="number" value={editForm.amount ?? ''}
                  onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 block">Type</label>
                <select value={editForm.type}
                  onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                  className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button onClick={handleSaveEdit}
                  className="flex-1 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
                <button onClick={() => setShowEditModal(false)}
                  className="flex-1 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export default Transactions;