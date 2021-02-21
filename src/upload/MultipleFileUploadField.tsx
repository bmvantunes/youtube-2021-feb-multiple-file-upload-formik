import { Grid } from '@material-ui/core';
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import { SingleFileUploadWithProgress } from './SingleFileUploadWithProgress';
import { UploadError } from './UploadError';

export interface UploadableFile {
  file: File;
  errors: FileError[];
  url?: string;
}

export function MultipleFileUploadField({ name }: { name: string }) {
  const [_, __, helpers] = useField(name);

  const [files, setFiles] = useState<UploadableFile[]>([]);
  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    const mappedAcc = accFiles.map((file) => ({ file, errors: [] }));
    setFiles((curr) => [...curr, ...mappedAcc, ...rejFiles]);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
    // helpers.setTouched(true);
  }, [files]);

  function onUpload(file: File, url: string) {
    setFiles((curr) =>
      curr.map((fw) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  function onDelete(file: File) {
    setFiles((curr) => curr.filter((fw) => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ['image/jpeg', 'video/*', '.pdf'],
    maxSize: 300 * 1024 // 300KB
  });

  return (
    <React.Fragment>
      <Grid item>
        <div {...getRootProps()}>
          <input {...getInputProps()} />

          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </Grid>

      {files.map((fileWrapper, idx) => (
        <Grid item>
          {fileWrapper.errors.length ? (
            <UploadError file={fileWrapper.file} errors={fileWrapper.errors} onDelete={onDelete}/>
          ) : (
            <SingleFileUploadWithProgress
              onDelete={onDelete}
              onUpload={onUpload}
              key={idx}
              file={fileWrapper.file}
            />
          )}
        </Grid>
      ))}
    </React.Fragment>
  );
}
