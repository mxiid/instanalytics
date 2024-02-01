'use client'

import React, { useRef, useState } from "react";

export default function DropzoneButton() {
    const dropzoneStyles = {
        maxWidth: '2xl',
        margin: '0 auto',
    };

    const labelStyles = {
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '120px',
        borderWidth: '2px',
        borderColor: '#3b84f5',
        borderStyle: 'dashed',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        backgroundColor: '#151719',
    };

    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState("");

    const handleClick = () => {
        // Perform the desired action here
        console.log("File uploaded!");
    };

    const handleFileChange = (event: any) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };

    return (
        <div style={dropzoneStyles}>
            <div style={labelStyles} onClick={handleClick}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingTop: '0.625rem',
                    paddingBottom: '0.75rem'
                }}>
                    <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    <p style={{marginBottom: '0.25rem', fontSize: '0.875rem', color: '#6B7280'}}><span
                        style={{fontWeight: '600'}}>{fileName ? fileName : "Click to upload or drag and drop your CSV"}</span>
                    </p>

                </div>
                <input ref={fileInputRef} id="dropzone-file" type="file" className="hidden" accept=".csv"
                       onChange={handleFileChange}/>
                <button type="button"
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2"
                        onClick={handleClick}>Upload
                    File
                </button>
            </div>
        </div>
    );
}

