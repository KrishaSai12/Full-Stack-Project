// ProductSearch    component code will be available

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import Loader from './layouts/Loader'
import Product from "./Product";
import { toast } from 'react-toastify' // to display the errors
import { useParams } from "react-router-dom";
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css'
import 'rc-tooltip/assets/bootstrap.css';


export default function ProductSearch() {
    const dispatch = useDispatch();
    const products= useSelector((state) => state.productsState.products)
    const { loading } = useSelector((state) => state.productsState)
    const { error } = useSelector((state) => state.productsState);
    const { keyword } = useParams()
    const [price, setPrice] = useState([1, 100000])
    const [priceChanged, setPriceChanged] = useState(price)
    const [category, setcategory] = useState(null)
    const [rating, setrating] = useState(0)
    const Categories = [
        'Phone ',
        'Laptops',
        'Watch',
        'EarPhones',
        'accessories'

    ];



    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_CENTER
            })

        }        // to display the position
        dispatch(getProducts(keyword, priceChanged, category, rating));

    }, [dispatch, error, keyword, priceChanged, category, rating]);


    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'HomePage'} />
                    <h1 id="products_heading">Search Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            <div className="col-6 col-md-3 mb-5 mt-5">
                                {/* price based filter */}
                                <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                                    <Slider
                                        range={true}
                                        marks={
                                            {
                                                10: "$10",
                                                100000: "$100000"

                                            }
                                        }
                                        min={10}
                                        max={100000}
                                        defaultValue={price}
                                        onChange={(price) => {
                                            setPrice(price)
                                        }}
                                        handleRender={
                                            renderProps => {
                                                return (
                                                    <Tooltip overlay={`$${renderProps.props['aria-valuenow']}`}>
                                                        <div {...renderProps.props}>
                                                        </div>
                                                    </Tooltip>
                                                )
                                            }
                                        }




                                    />

                                </div>
                                <hr className="my-5" />
                                {/* category filter */}
                                <div className="mt-5">
                                    <h2 className="mb-3"> Categories</h2>
                                    <ul className="pl-0">
                                        {Categories.map(category =>
                                            <li
                                                style={{
                                                    cursor: "pointer",
                                                    listStyleType: "none"
                                                }}
                                                key={category}
                                                onClick={() => {
                                                    setcategory(category)

                                                }}


                                            >  {category}
                                            </li>


                                        )}


                                    </ul>
                                </div>
                                <hr className="my-5" />
                                {/* rating filter */}
                                <div className="mt-5">
                                    <h3 className="mb-3">Ratings</h3>
                                    <ul className="pl-0">
                                        {[5, 4, 3, 2, 1].map(star =>
                                            <li
                                                style={{
                                                    cursor: "pointer",
                                                    listStyleType: "none"
                                                }}
                                                key={star}
                                                onClick={() => {
                                                    setrating(star)

                                                }}


                                            >
                                                <div className="rating-outer">
                                                    <div
                                                        className="rating-inner"
                                                        style={
                                                            {
                                                                width: `${star * 20}%`
                                                            }
                                                        }>

                                                    </div>
                                                </div>
                                            </li>


                                        )}


                                    </ul>
                                </div>
                            </div>
                            <div className="col-6 col-md-9">
                                <div className="row">
                                    {products && products.map((product) => {
                                        return <Product col={4} key={product._id} product={product} />

                                    })}
                                </div>
                            </div>

                        </div>
                    </section>


                </Fragment>
            }
        </Fragment>


    );

}