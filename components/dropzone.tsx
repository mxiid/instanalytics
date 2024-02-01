'use client'

import React, { useRef, useState } from "react";
import { handleFormSubmit} from "@/app/utils/actions";
import { useFormState} from "react-dom";
export default function DropzoneButton() {
    const dropzoneStyles: React.CSSProperties = {
        maxWidth: '2xl',
        margin: '0 auto',
    };

    const labelStyles: React.CSSProperties = {
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

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [fileName, setFileName] = useState<string>("");

    const handleDropzoneClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        }
    };


    const [state, formAction] = useFormState(handleFormSubmit, null);

    return (
        <>
            <form action={formAction}>
                <div style={labelStyles} onClick={handleDropzoneClick}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: '0.625rem',
                        paddingBottom: '0.75rem'
                    }}>
                        <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24"
                             xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p style={{marginBottom: '0.25rem', fontSize: '0.875rem', color: '#6B7280'}}><span
                            style={{fontWeight: '600'}}>{fileName ? fileName : "Click to upload or drag and drop your CSV"}</span>
                        </p>

                    </div>
                    <input name="dropzone-file" ref={fileInputRef} id="dropzone-file" type="file" className="hidden" accept=".csv"
                           onChange={handleFileChange}/>

                </div>
                <button type="submit"
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5"
                >Upload
                    File
                </button>
            </form>
            {state && <div
                className="flex items-center h-4 w -4 p-4 mb-4 mt-2 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"
                role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">{state?.message}</span>
                </div>
            </div>}


        </>
    );
}
