import React from 'react';
import './Table.scss';

const Table = ({ columns, data }) => {
    return(
        <table className = "table">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key = {index}>{col.header}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key = {rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key = {colIndex}>{col.cell(row)}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;