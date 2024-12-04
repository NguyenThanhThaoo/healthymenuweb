import { CKEditor } from "@ckeditor/ckeditor5-react";
import React from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor'
import classNames from "classnames/bind";
import styles from './blogs.module.scss'
import './newBlog.css'
import { memo } from "react";
import { uploadimage } from "../../../../API/blogRequest";
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
                try {
                    const format = new FormData()
                    format.append('image', file)
                    console.log(format, "ok")
                    const { data } = await uploadimage(format)
                    if (data.success === 1) {
                        resolve({ default: data.url })
                    } else {
                        alert(data.message)
                    }
                } catch {
                    reject('error')
                }
            });
        });
    }

    // Implement the "abort" method if needed.
    abort() {
        // If the upload is cancellable, you can handle aborting here.
    }
}


const MyEditorBlog = ({ setValueContent, valueContent, activeImageInsert = false, valueOfContent = '' }) => {



    return (<>
        <div className={cx("wrapper-editorblog")}>
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
                                'fontFamily',
                                'fontColor',
                                'fontSize',
                                '|',
                                'blockQuote',
                                'bold',
                                'italic',
                                'underline',
                                'numberedList',
                                'alignment',
                                'link',
                                activeImageInsert && 'imageInsert',
                                'mediaEmbed',
                                'code',
                                'codeBlock',
                                'htmlEmbed',
                                'sourceEditing'
                            ]
                        },

                    }}


                    data={valueOfContent}
                    onReady={(editor) => {
                        // You can store the "editor" and use when it is needed.

                        editor.plugins.get('FileRepository').createUploadAdapter = loader => {
                            return new MyUploadAdapter(loader);
                        };

                        const data = editor.getData();
                        console.log("Editor is ready to use!", editor, data);
                    }}


                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setValueContent(data)
                        console.log({ event, editor, data });
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
            {/* <div className={cx("code-view")}>
                <div className={cx("text-area")}>

                    {Parser().parse(valueContent)
                    }

                </div>
            </div> */}
        </div>
    </>);
};

export default memo(MyEditorBlog);
