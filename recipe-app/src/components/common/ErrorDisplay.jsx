import React, { useContext } from 'react';
import { ErrorContext } from './ErrorContext';
import './ErrorDisplay.scss';

const ErrorDisplay = () => {
    const { error } = useContext(ErrorContext);

    if (!error) return null;

    return (
        <div className="error-display">
            {error}
        </div>
    );
}