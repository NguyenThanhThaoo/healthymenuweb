import React from 'react';

const Image = (props) => {
    const { contentState, entityKey } = props;
    const entity = contentState.getEntity(entityKey);
    const { src } = entity.getData();
    console.log(src.preview)
    return <img src={src} alt="Uploaded" />;
};

export default Image;