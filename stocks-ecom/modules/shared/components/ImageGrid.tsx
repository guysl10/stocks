import React from 'react';
import Gallery from 'react-grid-gallery';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { useRouter } from 'next/router';

export type IImageGridRecords = Array<{
  thumbnail: string, thumbnailWidth: number, thumbnailHeight: number, _id: string, src: string
}>;

const useStyles = makeStyles(() => createStyles({
  root: {
    display: 'block',
    minHeight: '1px',
    width: '100%',
    overflow: 'auto',
    '& .ReactGridGallery_tile-viewport': {
      borderRadius: 10,
    },
  },
}));

export default function ImageGrid({ images }: {images: IImageGridRecords}) {
  const router = useRouter();
  const classes = useStyles();

  const openPost = (imageIndex) => {
    // eslint-disable-next-line no-underscore-dangle
    const imageId = images[imageIndex]._id;
    router.push(`/p/${imageId}`);
  };

  return (
    <div className={classes.root}>
      <Gallery
        rowHeight={250}
        images={images}
        margin={3}
        enableLightbox={false}
        enableImageSelection={false}
        onClickThumbnail={openPost}
      />
    </div>
  );
}
