import React, { useState } from 'react';
import FileUpload from '../components/upload';
import { parseCsv } from '@/app/utils/parseCsv';

interface RowData {
    [key: string]: string | number | boolean; // Adjust this based on your CSV data
}

export default function Tablee() {
    const [csvData, setCsvData] = useState<RowData[]>([]);

    const handleUpload = (data: string) => {
        parseCsv(data, setCsvData);
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">CSV File Upload</h1>
            <FileUpload onUpload={handleUpload} />
            <div className="table-responsive">
                <table className="table table-striped mt-4">
                    <thead>
                    <tr>
                        {csvData.length > 0 &&
                            Object.keys(csvData[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                    </tr>
                    </thead>
                    <tbody>
                    {csvData.map((row, index) => (
                        <tr key={index}>
                            {Object.values(row).map((value, index) => (
                                <td key={index}>{value}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
