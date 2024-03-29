import React, { useState, ChangeEvent } from 'react';

interface FileUploadProps {
    onUpload: (data: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUpload }) => {
    const [file, setFile] = useState<File>();

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target && e.target.result && typeof e.target.result === 'string') {
                    onUpload(e.target.result);
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="mb-3">
            <input type="file" onChange={handleFileChange} />
            <button className="btn btn-primary mt-2" onClick={handleSubmit}>
                Upload
            </button>
        </div>
    );
};

export default FileUpload;
