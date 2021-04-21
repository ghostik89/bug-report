import React, { useState } from "react";
import {DragAndDrop} from "./DragAndDrop";

const config = {
    allowedFileFormats: ["image/jpeg", "image/jpg", "image/png"],
    fileSizeMBLimit: 20,
    filesLimit: 1
};

const FILE_UPLOADER_STATE = {
    INIT: "INIT",
    PROCESSING: "PROCESSING",
    SUCCESS: "SUCCESS",
    FAILURE: "FAILURE"
};

const FileUploader = () => {
    const [loaderState, setLoaderState] = useState(FILE_UPLOADER_STATE.INIT);

    const processDrop = () => {
        //Simulate async request for file upload
        setTimeout(() => {
            setLoaderState(FILE_UPLOADER_STATE.PROCESSING);
        }, 1000);
        setTimeout(() => {
            setLoaderState(FILE_UPLOADER_STATE.SUCCESS);
        }, 3000);
    };
    return (
        <>
            {loaderState === FILE_UPLOADER_STATE.INIT && (
                <DragAndDrop processDrop={processDrop} config={config}>
                    <div>Drag and drop files here</div>
                    <div>State machine based on file upload</div>
                </DragAndDrop>
            )}
            {loaderState === FILE_UPLOADER_STATE.PROCESSING && (
                <div className="drag-container">Processing...</div>
            )}
            {loaderState === FILE_UPLOADER_STATE.SUCCESS && (
                <div className="drag-container">File Upload done!</div>
            )}
            {loaderState === FILE_UPLOADER_STATE.FAILURE && (
                <div className="drag-container">
                    File Upload failed. Please try again!
                </div>
            )}
        </>
    );
};

export default FileUploader;
