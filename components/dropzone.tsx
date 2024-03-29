import React, { useRef, useState } from "react";
import { handleFormSubmit } from "@/app/utils/actions";
import { useRouter } from "next/navigation";
import {useDispatch} from "react-redux";

export default function DropzoneButton() {
    const router = useRouter();
    const dispatch = useDispatch();
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
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

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

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            setIsLoading(true); // Set isLoading to true while uploading
            const response = await handleFormSubmit(null, formData);

            if (response.status === 'success') {
                dispatch({type: 'SET_FILE_NAME', payload: fileName});
                router.push(`/table?fileName=${encodeURIComponent(fileName)}`);
                // router.push('/table'); // Redirect to '/table' after successful form submission
            } else {
                setErrorMessage(response.message || "An error occurred while uploading the file.");
            }
        } catch (error) {
            console.error('Error handling form submission:', error);
            setErrorMessage("An error occurred while uploading the file.");
        } finally {
            setIsLoading(false); // Set isLoading back to false after upload completion or error
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} action="">
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
                        className={`text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mt-5 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                >
                    {isLoading ? 'Uploading...' : 'Upload File'}
                </button>
                {errorMessage && (
                    <div className="text-red-500 mt-2">{errorMessage}</div>
                )}
            </form>
        </>
    );
}
