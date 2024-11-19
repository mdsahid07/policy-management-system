import React from 'react';

interface YearNavigatorProps {
    years: number[];
    currentYear: number;
    onYearChange: (year: number) => void;
}

const YearNavigator: React.FC<YearNavigatorProps> = ({ years, currentYear, onYearChange }) => {
    return (
        <div className="flex space-x-4 my-4">
            {years.map((year) => (
                <button
                    key={year}
                    className={`px-3 py-1 rounded ${year === currentYear ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    onClick={() => onYearChange(year)}
                >
                    {year}
                </button>
            ))}
        </div>
    );
};

export default YearNavigator;
