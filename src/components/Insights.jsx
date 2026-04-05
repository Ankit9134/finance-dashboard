import React, { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown, Award, Calendar, IndianRupee, Activity } from 'lucide-react';
import { formatCurrency } from '../utils/helpers';

const Insights = ({ insights }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const insightCards = [
    {
      title: 'Highest Spending Category',
      value: insights.highestCategory.name,
      subValue: formatCurrency(insights.highestCategory.amount),
      icon: Award,
      color: 'purple',
      trend: null,
    },
    {
      title: 'Monthly Change',
      value: `${Math.abs(insights.monthlyChange)}%`,
      subValue: insights.monthlyChange >= 0 ? 'Increase' : 'Decrease',
      icon: Calendar,
      color: 'blue',
      trend: insights.monthlyChange >= 0 ? 'up' : 'down',
    },
    {
      title: 'Average Daily Spending',
      value: formatCurrency(parseFloat(insights.avgDailySpending) || 0),
      subValue: 'Per day',
      icon: IndianRupee,
      color: 'orange',
      trend: null,
    },
    {
      title: 'Total Transactions',
      value: insights.totalTransactions,
      subValue: 'All time',
      icon: Activity,
      color: 'green',
      trend: null,
    },
  ];

  const colorClasses = {
    purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
    blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
    orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
    green: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
  };

  return (
    <div className="space-y-6" ref={ref}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insightCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${colorClasses[card.color]}`}>
                  <Icon className="w-6 h-6" />
                </div>
                {card.trend && (
                  <div className={`flex items-center gap-1 text-sm ${card.trend === 'up' ? 'text-red-600' : 'text-green-600'}`}>
                    {card.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    <span>{Math.abs(parseFloat(insights.monthlyChange))}%</span>
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                {card.title}
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {card.value}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {card.subValue}
              </p>
            </div>
          );
        })}
      </div>

      <div
        style={{
          transitionDelay: '400ms',
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          opacity: visible ? 1 : 0,
          transition: 'transform 0.5s ease, opacity 0.5s ease',
        }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white"
      >
        <div className="flex items-start gap-3">
          <div className="bg-white/20 rounded-lg p-2 animate-pulse">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-semibold mb-1">Financial Tip</h4>
            <p className="text-sm opacity-95">
              {insights.monthlyChange > 0
                ? `Your spending increased by ${insights.monthlyChange}% this month. Consider reviewing your ${insights.highestCategory.name.toLowerCase()} expenses.`
                : `Your spending decreased by ${Math.abs(insights.monthlyChange)}% this month. Keep it up!`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
