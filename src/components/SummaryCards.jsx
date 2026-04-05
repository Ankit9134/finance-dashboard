import React from 'react';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const SummaryCards = ({ income, expenses, balance, month }) => {
  const monthLabel = month
    ? new Date(month + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : '';

  const cards = [
    {
      title: `Balance (${monthLabel})`,
      value: balance,
      icon: Wallet,
      color: 'blue',
      prefix: '',
    },
    {
      title: `Income (${monthLabel})`,
      value: income,
      icon: TrendingUp,
      color: 'green',
      prefix: '+',
    },
    {
      title: `Expenses (${monthLabel})`,
      value: expenses,
      icon: TrendingDown,
      color: 'red',
      prefix: '-',
    },
  ];
  
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    red: 'from-red-500 to-red-600',
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        const isNegative = card.title === 'Total Expenses';
        const displayValue = isNegative ? -(card.value || 0) : (card.value || 0);
        
        return (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className={`bg-gradient-to-r ${colorClasses[card.color]} p-3`}>
              <Icon className="text-white w-8 h-8" />
            </div>
            <div className="p-6">
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {card.prefix}{formatCurrency(Math.abs(displayValue))}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;