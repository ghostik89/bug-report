import React, {useRef, useState} from "react";
import get from "lodash/get"
import {fileValidator, preventBrowserDefaults} from "../../utils/helpers";
import './drag-and-drop.sass'

export const DragAndDrop = ({ processDrop, children, config }:any) => {
    let [dragOverlay, setDragOverlay] = useState(false);
    const [data, setData] = useState<string|undefined>(undefined);
    const [error, setError] = useState(false);
    let dragCounter = useRef(0);

    const handleDrag = (e:any) => {
        preventBrowserDefaults(e);
    };
    const handleDragIn = (e:any) => {
        preventBrowserDefaults(e);
        dragCounter.current++;
        if (get(e, "dataTransfer.items.length") > 0) {
            setDragOverlay(true);
        }
    };
    const handleDragOut = (e:any) => {
        preventBrowserDefaults(e);
        dragCounter.current--;
        if (dragCounter.current === 0) {
            setDragOverlay(false);
        }
    };
    const handleDrop = (e:any) => {
        const files = get(e, "dataTransfer.files");
        preventBrowserDefaults(e);
        setDragOverlay(false);
        setError(false);
        dragCounter.current = 0;
        const { isValidFile, errVal } = fileValidator(files, config);
        if (!isValidFile) {
            if (errVal) {
                setError(errVal);
            }
            return false;
        }
        fileReader(files);
        processDrop(files);
    };

    const fileReader = (files: Blob[]) => {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = loadEvt => {
            // @ts-ignore
            setData(loadEvt.target.result);
        };
    };

    const dragOverlayClass = dragOverlay ? "overlay" : "";

    return (
        <div>
            {error && <p className="error">{error}</p>}
            <div
                className={`drag-container ${dragOverlayClass}`}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                {data && <img alt="" src={data} />}
                {children}
                <div className="button-wrapper">
                    {data && <button onClick={() => setData(undefined)}>Remove</button>}
                </div>
            </div>
        </div>
    );
}