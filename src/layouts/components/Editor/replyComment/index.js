import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import classNames from "classnames/bind";
import styles from './replyComments.module.scss'
import './replyComments.css'
import { memo } from "react";
import { uploadimage } from "../../../../API/commentRequest";
// import { updateImage } from "../../../../../API/userRequest";

const cx = classNames.bind(styles)
class MyUploadAdapter {
    constructor(loader) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(file => {
            return new Promise(async (resolve, reject) => {
                // Simulate an image upload to your server.
                console.log(file, "ok")
                try {
                    const format = new FormData()
                    format.append('image', file)
                    const { data } = await uploadimage(format)
                    if (data.success === 1) {
                        resolve({ default: data.url })
                    } else {
                        alert(data.message)
                    }
                } catch {
                    reject('error')
                }
                // setTimeout(() => {
                //     console.log()
                //     const response = {
                //         default: file.name, // URL of the uploaded image
                //     };
                //     resolve(response);
                // }, 2000); // Simulate a 2-second delay (replace with actual server upload code)
            });
        });
    }

    // Implement the "abort" method if needed.
    abort() {
        // If the upload is cancellable, you can handle aborting here.
    }
}

const EditorReplyComments = ({ handleSetValueReplyComment, valueOfReplyComment = '' }) => {

    return (
        <div className='wrapper-content'>
            <div className={cx('inputContent')}>
                <CKEditor
                    editor={Editor}
                    config={{
                        placeholder: "Nhập nội dung ở đây...",
                        toolbar: {
                            items: [
                                'undo',
                                'redo',
                                'heading',
                                'fontSize',
                                'blockQuote',
                                'bold',
                                'italic',
                                'numberedList',
                                'alignment',
                                'imageInsert',
                                'code',
                                'codeBlock',
                                'htmlEmbed',
                            ]
                        },

                    }}
                    data={valueOfReplyComment}


                    onChange={(event, editor) => {
                        const data = editor.getData();
                        handleSetValueReplyComment(data)
                    }}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.

                        editor.plugins.get('FileRepository').createUploadAdapter = loader => {
                            return new MyUploadAdapter(loader);
                        };

                        const data = editor.getData();
                        console.log("Editor is ready to use!", editor, data);
                    }}

                // onBlur={(event, editor) => {
                //     console.log("Blur.", editor);
                // }}
                // onFocus={(event, editor) => {
                //     const data = editor.getData();
                //     console.log("Focus.", editor, data);
                // }}
                />
                {/* <div>Da luu</div> */}
            </div>
        </div>
    );
};

export default memo(EditorReplyComments);
