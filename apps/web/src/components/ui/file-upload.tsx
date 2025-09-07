"use client";

import { useState, useRef, useCallback, type DragEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { UploadCloud, X, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type FileStatus = "idle" | "dragging" | "uploading" | "error" | "success";
interface FileError { message: string; code: string; }
interface FileUploadProps {
    onUpload: (file: File) => Promise<void>;
    onUploadError?: (error: FileError) => void;
    acceptedFileTypes?: string[];
    maxFileSize?: number;
    onFileRemove?: () => void;
    validateFile?: (file: File) => FileError | null;
    className?: string;
}

const formatBytes = (bytes: number, decimals = 2): string => {
    if (!bytes) return "0 Bytes";
    const k = 1024, i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(decimals))} ${["Bytes", "KB", "MB", "GB", "TB"][i]}`;
};

const UploadIllustration = () => (
    <svg viewBox="0 0 100 100" fill="none" className="w-16 h-16">
        <circle cx="50" cy="50" r="45" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="2" strokeDasharray="4 4">
            <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="60s" repeatCount="indefinite"/>
        </circle>
        <path d="M30 35H70C75 35 75 40 75 40V65C75 70 70 70 70 70H30C25 70 25 65 25 65V40C25 35 30 35 30 35Z" 
              className="fill-blue-100 dark:fill-blue-900/30 stroke-blue-500 dark:stroke-blue-400" strokeWidth="2">
            <animate attributeName="d" dur="2s" repeatCount="indefinite" 
                     values="M30 35H70C75 35 75 40 75 40V65C75 70 70 70 70 70H30C25 70 25 65 25 65V40C25 35 30 35 30 35Z;M30 38H70C75 38 75 43 75 43V68C75 73 70 73 70 73H30C25 73 25 68 25 68V43C25 38 30 38 30 38Z;M30 35H70C75 35 75 40 75 40V65C75 70 70 70 70 70H30C25 70 25 65 25 65V40C25 35 30 35 30 35Z"/>
        </path>
        <path d="M30 35C30 35 35 35 40 35C45 35 45 30 50 30C55 30 55 35 60 35C65 35 70 35 70 35" 
              className="stroke-blue-500 dark:stroke-blue-400" strokeWidth="2" fill="none"/>
        <g className="transform translate-y-2">
            <line x1="50" y1="45" x2="50" y2="60" className="stroke-blue-500 dark:stroke-blue-400" strokeWidth="2" strokeLinecap="round">
                <animate attributeName="y2" values="60;55;60" dur="2s" repeatCount="indefinite"/>
            </line>
            <polyline points="42,52 50,45 58,52" className="stroke-blue-500 dark:stroke-blue-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none">
                <animate attributeName="points" values="42,52 50,45 58,52;42,47 50,40 58,47;42,52 50,45 58,52" dur="2s" repeatCount="indefinite"/>
            </polyline>
        </g>
    </svg>
);

const UploadingAnimation = ({ progress }: { progress: number }) => (
    <svg viewBox="0 0 240 240" fill="none" className="w-16 h-16">
        <defs>
            <mask id="progress-mask">
                <rect width="240" height="240" fill="black"/>
                <circle r="120" cx="120" cy="120" fill="white" strokeDasharray={`${(progress/100)*754}, 754`} transform="rotate(-90 120 120)"/>
            </mask>
        </defs>
        <style>{`.g-spin circle{transform-origin:120px 120px;animation:8s linear infinite}@keyframes r{to{transform:rotate(360deg)}}@keyframes rr{to{transform:rotate(-360deg)}}.g-spin circle:nth-child(odd){animation-name:r}.g-spin circle:nth-child(even){animation-name:rr}.g-spin circle:nth-child(2n){animation-delay:.2s}.g-spin circle:nth-child(3n){animation-delay:.3s}.g-spin circle:nth-child(5n){animation-delay:.5s}.g-spin circle:nth-child(7n){animation-delay:.7s}`}</style>
        <g className="g-spin" strokeWidth="10" strokeDasharray="18% 40%" mask="url(#progress-mask)">
            {[150,140,130,120,110,100,90,80,70,60,50,40,30,20].map((r,i) => 
                <circle key={r} r={r} cx="120" cy="120" stroke={["#FF2E7E","#FFD600","#00E5FF","#FF3D71","#4ADE80","#2196F3","#FFA726","#FF1493","#FFEB3B","#00BCD4","#FF4081","#76FF03","#448AFF","#FF3D00"][i]} opacity="0.95"/>
            )}
        </g>
    </svg>
);

export default function FileUpload({
    onUpload,
    onUploadError = () => {},
    acceptedFileTypes = ["image/*"],
    maxFileSize = 5242880,
    onFileRemove = () => {},
    validateFile = () => null,
    className,
}: FileUploadProps) {
    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<FileStatus>("idle");
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState<FileError | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleError = useCallback((error: FileError) => {
        setError(error);
        setStatus("error");
        onUploadError(error);
        setTimeout(() => { setError(null); setStatus("idle"); }, 3000);
    }, [onUploadError]);

    const handleFileSelect = useCallback(async (selectedFile: File | null) => {
        if (!selectedFile) return;
        setError(null);
        
        const validationError = 
            (selectedFile.size > maxFileSize && { message: `File size exceeds ${formatBytes(maxFileSize)}`, code: "FILE_TOO_LARGE" }) ||
            (acceptedFileTypes.length && !acceptedFileTypes.some(type => selectedFile.type.toLowerCase().match(type.toLowerCase())) && 
                { message: `File type must be ${acceptedFileTypes.join(", ")}`, code: "INVALID_FILE_TYPE" }) ||
            validateFile(selectedFile);
        
        if (validationError) return handleError(validationError);
        
        setFile(selectedFile);
        setStatus("uploading");
        setProgress(0);
        
        const progressInterval = setInterval(() => {
            setProgress(prev => Math.min(prev + 10, 90));
        }, 200);
        
        try {
            await onUpload(selectedFile);
            clearInterval(progressInterval);
            setProgress(100);
            setStatus("success");
        } catch (err) {
            clearInterval(progressInterval);
            handleError({ message: err instanceof Error ? err.message : "Upload failed", code: "UPLOAD_ERROR" });
            setFile(null);
        }
    }, [maxFileSize, acceptedFileTypes, validateFile, handleError, onUpload]);

    const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (status === "uploading" || status === "success") return;
        setStatus("idle");
        handleFileSelect(e.dataTransfer.files?.[0] || null);
    }, [status, handleFileSelect]);

    const dragHandlers = {
        onDragOver: (e: DragEvent) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            setStatus(prev => (prev !== "uploading" && prev !== "success") ? "dragging" : prev); 
        },
        onDragLeave: (e: DragEvent) => { 
            e.preventDefault(); 
            e.stopPropagation(); 
            setStatus(prev => prev === "dragging" ? "idle" : prev); 
        },
        onDrop: handleDrop
    };

    const removeFile = () => { 
        setFile(null); 
        setStatus("idle"); 
        setProgress(0); 
        onFileRemove(); 
    };

    return (
        <div className={cn("relative w-full max-w-sm mx-auto", className)}>
            <div className="group relative w-full rounded-xl bg-white dark:bg-black ring-1 ring-gray-200 dark:ring-white/10 p-0.5">
                <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"/>
                <div className="relative w-full rounded-[10px] bg-gray-50/50 dark:bg-white/[0.02] p-1.5">
                    <div className={cn("relative mx-auto w-full overflow-hidden rounded-lg border border-gray-100 dark:border-white/[0.08] bg-white dark:bg-black/50", 
                                      error && "border-red-500/50", status === "success" && "border-green-500/50")}>
                        <div className={cn("absolute inset-0 transition-opacity duration-300", status === "dragging" ? "opacity-100" : "opacity-0")}>
                            {["top-0 h-[20%] bg-gradient-to-b", "bottom-0 h-[20%] bg-gradient-to-t", "left-0 w-[20%] bg-gradient-to-r", "right-0 w-[20%] bg-gradient-to-l"].map((pos, i) => 
                                <div key={i} className={`absolute ${i<2?'inset-x-0':'inset-y-0'} ${pos} from-blue-500/10 to-transparent`}/>
                            )}
                            <div className="absolute inset-[20%] bg-blue-500/5 rounded-lg animate-pulse"/>
                        </div>
                        <div className="relative h-[240px]">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div key="success" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} 
                                                className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                        <CheckCircle className="w-16 h-16 text-green-500 mb-4"/>
                                        <div className="text-center space-y-2 mb-4">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Uploaded Successfully</h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[200px]">{file?.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-500">{formatBytes(file?.size || 0)}</p>
                                        </div>
                                        <button onClick={removeFile} 
                                                className="w-4/5 flex items-center justify-center gap-2 rounded-lg bg-red-100 dark:bg-red-900/20 px-4 py-2.5 text-sm font-semibold text-red-600 dark:text-red-400 transition-all duration-200 hover:bg-red-200 dark:hover:bg-red-900/30">
                                            <X className="w-4 h-4"/>
                                            <span>Remove & Upload New</span>
                                        </button>
                                    </motion.div>
                                ) : (status === "idle" || status === "dragging") ? (
                                    <motion.div key="dropzone" initial={{opacity:0,y:10}} animate={{opacity:status==="dragging"?0.8:1,y:0,scale:status==="dragging"?0.98:1}} 
                                                exit={{opacity:0,y:-10}} transition={{duration:0.2}} className="absolute inset-0 flex flex-col items-center justify-center p-6" {...dragHandlers}>
                                        <div className="mb-4"><UploadIllustration/></div>
                                        <div className="text-center space-y-1.5 mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white tracking-tight">Drag and drop image</h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {acceptedFileTypes.length ? acceptedFileTypes.map(t => t.split("/")[1]).join(", ").toUpperCase() : "Image files"} 
                                                {maxFileSize && ` up to ${formatBytes(maxFileSize)}`}
                                            </p>
                                        </div>
                                        <button onClick={() => fileInputRef.current?.click()} 
                                                className="w-4/5 flex items-center justify-center gap-2 rounded-lg bg-gray-100 dark:bg-white/10 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white transition-all duration-200 hover:bg-gray-200 dark:hover:bg-white/20 group">
                                            <span>Upload Image</span>
                                            <UploadCloud className="w-4 h-4 group-hover:scale-110 transition-transform duration-200"/>
                                        </button>
                                        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">or drag and drop your image here</p>
                                        <input ref={fileInputRef} type="file" className="sr-only" accept={acceptedFileTypes.join(",")}
                                               onChange={e => { handleFileSelect(e.target.files?.[0] || null); e.target.value = ""; }}/>
                                    </motion.div>
                                ) : status === "uploading" && (
                                    <motion.div key="uploading" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}} 
                                                className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                        <div className="mb-4"><UploadingAnimation progress={progress}/></div>
                                        <div className="text-center space-y-1.5 mb-4">
                                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Uploading...</h3>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-[200px]">{file?.name}</p>
                                            <div className="flex items-center justify-center gap-2 text-xs">
                                                <span className="text-gray-500 dark:text-gray-400">{formatBytes(file?.size || 0)}</span>
                                                <span className="font-medium text-blue-500">{Math.round(progress)}%</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <AnimatePresence>
                            {error && (
                                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} 
                                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <p className="text-sm text-red-500 dark:text-red-400">{error.message}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}