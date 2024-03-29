import React, { useEffect, useState } from 'react';
import Papa, { ParseResult } from 'papaparse';
import AWS from 'aws-sdk';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-quartz.css";
import { connect } from 'react-redux';

interface CsvRow {
    [key: string]: string | undefined;
}

const CsvTable = ({ fileName }: { fileName: string }) => { // Accepting fileName as props
    const [rowData, setRowData] = useState<CsvRow[]>([]);

    useEffect(() => {
        

        if (!accessKeyId || !secretAccessKey) {
            console.error('AWS credentials are not provided.');
            return;
        }

        const s3 = new AWS.S3({
            region: 'ap-southeast-1',
            credentials: {
                accessKeyId,
                secretAccessKey
            }
        });

        const params = {
            Bucket: 'instanalytics',
            Key: fileName
        };

        s3.getObject(params, (err: Error | null, result: AWS.S3.GetObjectOutput) => {
            if (err) {
                console.error('Error fetching CSV file:', err);
                return;
            }

            const csvData = result?.Body?.toString('utf-8') || '';

            Papa.parse(csvData, {
                header: true,
                complete: (result: ParseResult<CsvRow>) => {
                    setRowData(result.data || []);
                }
            });
        });
    }, [fileName]);

    const columnDefs = Object.keys(rowData[0] || {}).map((header: string) => ({
        headerName: header,
        field: header
    }));

    return (
        <div className="max-w-full mx-auto sm:max-w-none sm:flex sm:justify-center">
            <div data-aos="fade-up" data-aos-delay="400">
                <div className="ag-theme-quartz-dark" style={{ width: 1200, height: 800 }}>
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        defaultColDef={{sortable: true, filter: true}}
                    />
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: any) => ({
    fileName: state.fileName // Accessing fileName from Redux store
});

export default connect(mapStateToProps)(CsvTable); // Connecting CsvTable component to Redux store
