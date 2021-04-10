import Button from '@material-ui/core/Button';
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  imageContainer: {
    '& img': {
      maxWidth: '100%',
      maxHeight: 300,
      padding: 20,
      border: '2px solid gray',
      borderRadius: 10,
      marginTop: 10,
    },
  },
}));

interface IImageInputProps {
  onChange: (any)=>void,
  value: any
}

export default function ImageInput({ onChange, value }: IImageInputProps) {
  const classes = useStyles();
  const [imageFile, setImageFile] = useState(null);
  const onDrop = async (imageFiles) => {
    let imageFileData = null;
    if (imageFiles) {
      try {
        // eslint-disable-next-line prefer-destructuring
        imageFileData = imageFiles[0];
        imageFileData.preview = URL.createObjectURL(imageFiles[0]);
      } catch (e) { /* Do nothing */ }
    }
    setImageFile(imageFileData);
    onChange(imageFileData);
  };

  const { getRootProps, getInputProps } = useDropzone({ maxFiles: 1, onDrop, accept: 'image/*' });

  return (
    <div>
      { /* eslint-disable-next-line react/jsx-props-no-spreading */ }
      <Button {...getRootProps({ })} variant="outlined" color="primary">
        {/*  eslint-disable-next-line react/jsx-props-no-spreading */}
        <input {...getInputProps()} />
        Upload File
      </Button>
      <div className={classes.imageContainer}>
        {imageFile || value ? (
          <img
            className="upload-file"
            alt="uploaded file"
            src={imageFile ? imageFile.preview : (value.preview || value)}
          />
        ) : null}
      </div>
    </div>
  );
}
