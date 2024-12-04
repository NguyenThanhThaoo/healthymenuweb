import classNames from "classnames/bind"
import styles from './GoTop.module.scss'
import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { animateScroll } from "react-scroll";

const cx = classNames.bind(styles)


function GoTop() {
    const [top, setTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setTop(window.scrollY >= 300)
        }
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])
    const handleGoTop = () => {

        animateScroll.scrollToTop({
            top: 0,
            left: 0,

            duration: 1500,
            delay: 100,
            smooth: true,
        })
    }

    return (top && <div className={cx('wapper')} >
        <button onClick={handleGoTop} className={cx('button')}>
            <span className={cx('icon')}>
                <FontAwesomeIcon icon={faArrowUp} />
            </span>
        </button>
    </div>)
}

export default GoTop