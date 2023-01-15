import React, { useEffect, useState } from 'react';
import { FaCartArrowDown, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { product_filter, product_search, getProduct } from '../Redux/product.action';
import ProductCard from './ProductCard';
// import fontawesome from '@fortawesome/fontawesome'
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// import { AiOutlineShoppingCart } from "@react-icons/all-files";

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartData } = useSelector((store) => store.CartReducer)
    const { fetchedData, filterData, loading, error } = useSelector((state) => state.productReducer);
    const mappingData = filterData.length ? filterData : fetchedData
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [searchInput, setSearchInput] = useState("")
    console.log("fetchdata", fetchedData)

    const selectCategoryHandler = (e) => {
        const { checked, value } = e.target;
        if (checked) {
            setSelectedCategory([...selectedCategory, value]);

        }
        else {
            setSelectedCategory([...selectedCategory.filter((e) => e !== value)])
        }
    }


    const searchDataHandler = () => {

        dispatch(product_search(searchInput.split(" ")))

    }
    const searchOnKeyPress = (e) => {
        if (e.key === "Enter") {
            dispatch(product_search(searchInput.split(" ")))
        }
    }

    useEffect(() => {
       
        dispatch(product_filter(selectedCategory))
    }, [selectedCategory])

    useEffect(() => {
        dispatch(getProduct())
    }, [])
    return (
        <>
            <div id="navBar">
                <div className="menu">
                    <h3>TeeRex Store</h3>
                    <h4 style={{ marginRight: "5rem", cursor: "pointer" }}
                        onClick={() => {
                            navigate("/cart")
                        }}
                    >

                        Products
                        <FaCartArrowDown />

                        <span id='cart_item_count'>{cartData.length ? cartData.length : ""}</span>
                    </h4>
                </div>
            </div>


            <div className="searchDiv">
                <input type="text" placeholder='Search for products...' onChange={(e) => {
                    setSearchInput(e.target.value)
                }} onKeyPress={searchOnKeyPress} />
                <div className="searchIconDiv" onClick={searchDataHandler}>
                    <FaSearch />
                </div>
            </div>

            <div className="contentDiv">
                <div className='filter_div'>
                    {/* Fillter  product in color */}
                    <div className="checkBoxDiv">
                        <h4>Color</h4>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'Red'} /> <label htmlFor="">Red</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={"Blue"} /> <label htmlFor="">Blue</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'Green'} /> <label htmlFor="">Green</label>
                        </div>
                    </div>
                    {/* Filter on the basis of gender  */}
                    <div className="checkBoxDiv">
                        <h4>Gender</h4>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'Men'} /> <label htmlFor="">Men</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={"Women"} /> <label htmlFor="">Women</label>
                        </div>
                    </div>

                    {/* Fillter Price in selected range */}
                    <div className="checkBoxDiv">
                        <h4>Price</h4>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'250'} /> <label htmlFor="">0- Rs 250</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={"251"} /> <label htmlFor="">251- Rs 450</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'450'} /> <label htmlFor=""> Rs 450</label>
                        </div>
                    </div>
                    {/* Fillter on type*/}
                    <div className="checkBoxDiv">
                        <h4>Type</h4>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'Polo'} /> <label htmlFor="">Polo</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={"Hoodie"} /> <label htmlFor="">Hoodie</label>
                        </div>
                        <div className="check_box">
                            <input type="checkbox" name="" onChange={selectCategoryHandler} value={'Basic'} /> <label htmlFor="">Basic</label>
                        </div>
                    </div>

                </div>
                <div className='product_list_div'>
                    {
                        loading ? <img className='loaderImg' src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' alt='loadimg' /> : error ? <img className='loaderImg' src='https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif' alt='loadimg' /> : mappingData.map((data) => {
                            return (
                                <ProductCard data={data} key={data.id} />
                            )
                        })
                    }



                </div>
            </div>
        </>
    )
}

export default Dashboard