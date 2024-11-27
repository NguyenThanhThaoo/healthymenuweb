import { useEffect, useRef } from "react";
import { animateScroll } from "react-scroll";
import Header from "../components/Header";
import Footer from "../DefaultLayout/Footer";
function WithouSidebar({ children }) {
    const refPr = useRef()
    useEffect(() => {
        animateScroll.scrollToTop(refPr, {
            duration: 500,
            delay: 50,
            smooth: true,
        })
    })
    return (
        <div ref={refPr}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}
export default WithouSidebar