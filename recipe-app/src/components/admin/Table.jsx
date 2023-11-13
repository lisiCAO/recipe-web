import React from 'react';
import Button from '../common/Button';
import './Table.scss';


const Table = ({ columns, data,  onViewDetails, onDelete }) => {
    return(
        <table className = "table">
            <thead>
                <tr>
                    {columns.map((col, index) => (
                        <th key = {index}>{col.header}</th>
                    ))}
                    <th>Action</th> {/* 新增一个表头用于操作 */}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key = {rowIndex}>
                        {columns.map((col, colIndex) => (
                            <td key = {colIndex}>{col.cell(row)}</td>
                        ))}
                        <td>
                            <Button onClick={() => onViewDetails(row)} className = "btn btn-primary">Edit</Button>
                            <Button onClick={() => onDelete(row)} className = "btn btn-danger">Delete</Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Table;
