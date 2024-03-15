// Home component code will be available

import { Fragment, useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import MetaData from "./layouts/MetaData";
import { getProducts } from "../actions/productsActions";
import Loader from './layouts/Loader'
import Product from "./Product";
import { toast } from 'react-toastify' // to display the errors


export default function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productsState.products)
    const { loading } = useSelector((state) => state.productsState)
    const { error } = useSelector((state) => state.productsState);
   
   

    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: toast.POSITION.TOP_CENTER
            })

        }        // to display the position
        dispatch(getProducts(null,null,null,null));

    }, [dispatch, error]);


    return (
        <Fragment>
            {loading ? <Loader /> :
                <Fragment>
                    <MetaData title={'HomePage'} />
                    <h1 id="products_heading">Latest Products</h1>

                    <section id="products" className="container mt-5">
                        <div className="row">
                            {products && products.map((product) => {
                                return <Product col={3} key={product._id} product={product} />

                            })}
                        </div>
                    </section>
                   

                </Fragment>
            }
        </Fragment>


    );

}