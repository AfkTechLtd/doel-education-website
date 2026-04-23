declare module "react-dropzone" {
  import type { DragEventHandler, InputHTMLAttributes, RefAttributes } from "react";

  export type FileError = {
    code: string;
    message: string;
  };

  export type FileRejection = {
    file: File;
    errors: FileError[];
  };

  export type Accept = Record<string, string[]>;

  export type DropzoneOptions = {
    onDrop?: (acceptedFiles: File[], fileRejections: FileRejection[]) => void;
    multiple?: boolean;
    noClick?: boolean;
    maxFiles?: number;
    maxSize?: number;
    accept?: Accept;
  };

  export type DropzoneRootProps = {
    onClick?: React.MouseEventHandler<HTMLElement>;
    onDragEnter?: DragEventHandler<HTMLElement>;
    onDragOver?: DragEventHandler<HTMLElement>;
    onDragLeave?: DragEventHandler<HTMLElement>;
    onDrop?: DragEventHandler<HTMLElement>;
    role: string;
    tabIndex: number;
  } & Record<string, unknown>;

  export type DropzoneInputProps = InputHTMLAttributes<HTMLInputElement> &
    RefAttributes<HTMLInputElement>;

  export function useDropzone(options?: DropzoneOptions): {
    getRootProps: () => DropzoneRootProps;
    getInputProps: () => DropzoneInputProps;
    isDragActive: boolean;
    isDragReject: boolean;
    open: () => void;
  };
}
