import "../ContentBlock/shop.css";
import "../ContentBlock/commons.css";


import seasonSale from "../../assets/images/season-sale-banner.svg";

const Sidebar = () => {
    return (
        <aside className="sidebar">

            <div className="sidebar-item">
                <div className="sidebar-title">Categories</div>
                <div className="sidebar-content">
                    <ul className="custom-list">
                        <li className="item">All</li>
                        <li className="item active">Men</li>
                        <li className="item">Women</li>
                        <li className="item">Accessories</li>
                        <li className="item">New Arrivals</li>
                    </ul>
                </div>
            </div>

            <div className="sidebar-item">
                <div className="sidebar-title">Price</div>
                <div className="sidebar-content">
                    <div className="price-bar">
                        <input type="text" placeholder="0" className="input"/>
                        <input type="text" placeholder="200" className="input"/>
                    </div>
                </div>
            </div>

            <div className="sidebar-item">
                <div className="sidebar-title">Colors</div>
                <div className="sidebar-content">
                    <div className="colors">
                        <div className="color">
                            <input type="checkbox" className="color-checkbox" id="black" name="black" value="black"/>
                            <label htmlFor="black" className="color-name">Black</label>
                        </div>
                        <div className="color">
                            <input type="checkbox" className="color-checkbox" id="blue" name="blue" value="blue"/>
                            <label htmlFor="blue" className="color-name">Blue</label>
                        </div>
                        <div className="color">
                            <input type="checkbox" className="color-checkbox" id="red" name="red" value="red"/>
                            <label htmlFor="red" className="color-name">Red</label>
                        </div>
                        <div className="color">
                            <input type="checkbox" className="color-checkbox" id="yellow" name="yellow" value="yellow"/>
                            <label htmlFor="yellow" className="color-name">Yellow</label>
                        </div>
                        <div className="color">
                            <input type="checkbox" className="color-checkbox" id="green" name="green" value="green"/>
                            <label htmlFor="green" className="color-name">Green</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="sidebar-item">
                <div className="button-wrapper">
                    <button className="button">Apply Filter</button>
                    <div className="vertical-line"></div>
                </div>
            </div>

            <div className="sidebar-item">
                <div className="sidebar-title">Reviewed by you</div>
                    <div className="sidebar-content">
                        <div className="reviewed-products">
                            <div className="product">
                                <div className="image"></div>
                                <div className="info">
                                    <div className="name">Retro style handbag</div>
                                    <div className="price">
                                        <div className="current-price">$35.99</div>
                                        <div className="old-price">$52.99</div>
                                    </div>
                                </div>
                            </div>

                            <div className="product">
                                <div className="image"></div>
                                <div className="info">
                                    <div className="name">Warm casual sweater</div>
                                    <div className="price">
                                        <div className="current-price">$35.99</div>
                                    </div>
                                </div>
                            </div>

                            <div className="product">
                                <div className="image"></div>
                                <div className="info">
                                    <div className="name">Textured turtleneck with zip</div>
                                    <div className="price">
                                        <div className="current-price">$35.99</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                
                <div>
                    <a href="#">
                        <img src={seasonSale} alt="Season Sale Banner"/>
                    </a>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar;