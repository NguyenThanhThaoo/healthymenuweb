import { useEffect, useRef } from "react"
import { animateScroll } from "react-scroll"
function JustContent({ children }) {
    const refPr = useRef()
    useEffect(() => {
        animateScroll.scrollToTop(refPr, {
            duration: 500,
            delay: 50,
            smooth: true,
        })
    })
    return (<div ref={refPr}>{children}</div>
    )

}
export default JustContent