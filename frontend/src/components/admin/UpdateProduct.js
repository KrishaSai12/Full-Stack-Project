import { useDispatch, useSelector } from "react-redux";
import Sidebar from "./Sidebar"
import { Fragment, useEffect, useState } from "react"
import {  useParams } from "react-router-dom";
import { getProduct, updateProduct } from "../../actions/productAction";
import { clearProductUpdated } from "../../slices/productSlice";
import { toast } from 'react-toastify'
import { clearError } from "../../slices/productSlice";




export default function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [stock, setStock] = useState(0);


    const { loading, isProductUpdated, error, product=[] } = useSelector((state) => state.productState);
    const categories = [
        'Phone ',
        'Laptops',
        'Watch',
        'EarPhones',
        'accessories'
    ];


    const dispatch = useDispatch();
    const { id: productId } = useParams();



    const submitHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('stock', stock);
        formData.append('category', category);
        dispatch(updateProduct(productId, formData))
    }



    useEffect(() => {
        if (isProductUpdated) {
            toast('Product Updated Successfully', {
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearProductUpdated())
            });
          
           
        }
        if (error) {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: () => {
                    dispatch(clearError());
                }
            });
            return;
        }
        dispatch(getProduct(productId))

    }, [isProductUpdated, error, dispatch, productId]);

    useEffect(() => {
        if (product._id) {
            setName(product.name);
            setPrice(product.price);
            setDescription(product.description);
            setStock(product.stock);
            setCategory(product.category);

        }

    }, [product])
    return (

        <div className="row">
            <div className="col-12 col-md-2">
                <Sidebar />
            </div>
            <div className="col-12 col-md-10">
                <Fragment>
                    <div className="wrapper my-5">
                        <form onSubmit={submitHandler} className="shadow-lg" encType='multipart/form-data'>
                            <h1 className="mb-4">Update Product</h1>

                            <div className="form-group">
                                <label htmlFor="name_field">Name</label>
                                <input
                                    type="text"
                                    id="name_field"
                                    className="form-control"
                                    onChange={e => setName(e.target.value)}
                                    value={name}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price_field">Price</label>
                                <input
                                    type="text"
                                    id="price_field"
                                    className="form-control"
                                    onChange={e => setPrice(e.target.value)}
                                    value={price}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description_field">Description</label>
                                <textarea className="form-control" id="description_field" rows="8" onChange={e => setDescription(e.target.value)} value={description} ></textarea>
                            </div>

                            <div className="form-group">
                                <label htmlFor="category_field">Category</label>

                                <select value={category} onChange={e => setCategory(e.target.value)} className="form-control" id="category_field">
                                    <option value=""> Select</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}

                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="stock_field">Stock</label>
                                <input
                                    type="number"
                                    id="stock_field"
                                    className="form-control"
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>

                            <button
                                id="login_button"
                                type="submit"
                                disabled={loading}
                                className="btn btn-block py-3"
                            >
                                UPDATE
                            </button>

                        </form>
                    </div>
                </Fragment>


            </div>

        </div>

    )
}