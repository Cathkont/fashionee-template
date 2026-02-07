import "../ContentBlock/shop.css"
import "../ContentBlock/commons.css"
import bigDots from "../../assets/icons/dots-banner-big.svg"
import topLine from "../../assets/icons/top-line.svg"

const ContentBlock = () => {
    return (
        <main data-testid="content-block" className="content-block" >
            <div className="top-banner">
                <div className="left-content">
                    <div className="big-dots">
                        <img src={bigDots} alt=""/>
                    </div>
                    <div className="top-line">
                        <img src={topLine} alt=""/>
                    </div>
                    <div className="left-header">
                        <div className="main-header">Shop</div>
                        <div className="bar">
                            <div className="home">Home</div>
                            <div className="home active">Shop</div>
                        </div>
                    </div>
                </div>    
                <div className="gray-square"></div>
            </div> 
        </main>
    )
}

export default ContentBlock;