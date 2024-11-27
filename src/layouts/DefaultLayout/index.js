import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { animateScroll } from "react-scroll";
import Header from "../components/Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import styles from './Default.module.scss'

const cx = classNames.bind(styles)

function DefaultLayout({ children }) {
    const refPr = useRef()
    useEffect(() => {
        animateScroll.scrollToTop(refPr, {
            duration: 500,
            delay: 50,
            smooth: true,
        })
    })
    return (
        <div className={cx('wrapper')} >
            <Header />
            <div className={cx("container")} ref={refPr}>
                <Sidebar />
                <div className={cx("content")}>{children}</div>
            </div>
            <Footer />
        </div>
    )
}
export default DefaultLayout