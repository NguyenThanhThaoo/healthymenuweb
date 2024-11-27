import classNames from 'classnames/bind'
import styles from './UploadImage.module.scss'
import Tippy from '@tippyjs/react/headless'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
// import { useEffect } from 'react'
const cx = classNames.bind(styles)

function UploadImages({ children, upImage, setUpImage, setFile, file }) {
    // const [bell, setBell] = useState(false);
    // const hideBell = () => setBell(false);


    const hanldePeviewImage = (e) => {
        const input = e.target;
        const selectedFile = input.files[0];

        if (!selectedFile) {
            // User canceled file selection, clear the state.
            setFile(null);
            return;
        }

        // Clear the input value to force onChange event to trigger next time.
        input.value = '';

        // Set the selected file to state for further processing.
        selectedFile.preview = URL.createObjectURL(selectedFile);
        setFile(selectedFile);
    }
    return (
        <Tippy
            interactive
            visible={upImage} onClickOutside={() => setUpImage(false)}
            placement='bottom-end'
            render={attrs => (
                <>
                    <label for="OptionImage" className={cx('upload')} tabIndex="-1" {...attrs}>
                        <div className={cx('upload-heading')}>
                            <FontAwesomeIcon icon={faUpload} />
                        </div>
                        <div className={cx('upload-content')}>
                            <p>Tải ảnh lên</p>
                        </div>

                    </label>
                    <input id='OptionImage' type='file' accept='image/jpg, image/jpeg, image/png' style={{ display: "none" }} onChange={(e) => hanldePeviewImage(e)} />
                </>
            )}>
            {children}
        </Tippy>
    )
}
export default UploadImages