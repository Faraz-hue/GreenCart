
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";


const ProductDetails = () => {
    const {
        products,
        navigate,
        currency,
        addToCart,
    } = useAppContext();

    const { id } = useParams();

    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = products?.find((item) => item._id === id);

    {/* Related Products */ }
    useEffect(() => {
        if (!products?.length || !product) return;

        const productsCopy = products.filter(
            (item) =>
                item.category === product.category &&
                item._id !== product._id &&
                item.inStock
        );

        setRelatedProducts(productsCopy.slice(0, 5));
    }, [products, product]);

    {/* Main Image */ }
    useEffect(() => {
        setThumbnail(product?.image?.[0] || null);
    }, [product]);

    if (!product) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <p className="text-gray-500">
                    Product not found.
                </p>
            </div>
        );
    }

    return (
        <div className="mt-12 px-4 sm:px-6 md:px-8">

            {/* Breadcrumb */}
            <div className="text-sm text-gray-500 mb-6">
                <Link to="/" className="hover:text-primary-500">
                    Home
                </Link>

                <span className="mx-2">/</span>

                <Link to="/products" className="hover:text-primary-500">
                    Products
                </Link>

                <span className="mx-2">/</span>

                <Link
                    to={`/ products / ${product.category.toLowerCase()} `}
                    className="hover:text-primary-500"
                >
                    {product.category}
                </Link>

                <span className="mx-2">/</span>

                <span className="text-primary-500">
                    {product.name}
                </span>
            </div>

            {/* Product Details */}
            <div className="flex flex-col md:flex-row gap-8 lg:gap-16 mt-4">

                {/* Images */}
                <div className="flex gap-3 w-full md:w-1/2">

                    {/* Thumbnails */}
                    <div className="flex flex-col gap-3 shrink-0">
                        {product.image?.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setThumbnail(image)}
                                className={`border rounded overflow - hidden cursor - pointer
w - 16 h - 16 sm: w - 20 sm: h - 20
                  ${thumbnail === image
                                        ? "border-primary-500"
                                        : "border-gray-500/30"
                                    } `}
                            >
                                <img
                                    src={image}
                                    alt={`Thumbnail ${index + 1} `}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Main Image */}
                    <div className="border border-gray-500/30 rounded overflow-hidden flex-1 h-lg sm:h-lg">
                        <img
                            src={thumbnail}
                            alt={product.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* Product Information */}
                <div className="text-sm w-full md:w-1/2">

                    <h1 className="text-2xl sm:text-3xl font-medium text-gray-800">
                        {product.name}
                    </h1>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-2">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <img
                                    key={i}
                                    src={
                                        i < 4
                                            ? assets.star_icon
                                            : assets.star_dull_icon
                                    }
                                    alt="star"
                                    className="w-3.5 md:w-4"
                                />
                            ))}

                        <p className="text-base ml-2">
                            (4)
                        </p>
                    </div>

                    {/* Price */}
                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">
                            MRP: {currency}{product.price}
                        </p>

                        <p className="text-2xl font-medium text-gray-800 mt-1">
                            {currency}{product.offerPrice}
                        </p>

                        <span className="text-gray-500/70 text-xs">
                            (inclusive of all taxes)
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-base font-medium mt-6">
                        About Product
                    </p>

                    <ul className="list-disc ml-4 mt-2 text-gray-500/70 space-y-1">
                        {product.description?.map((desc, index) => (
                            <li key={index}>
                                {desc}
                            </li>
                        ))}
                    </ul>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row items-center mt-10 gap-4 text-base">

                        <button
                            onClick={() => addToCart(product._id)}
                            className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition rounded"
                        >
                            Add to Cart
                        </button>

                        <button
                            onClick={() => {
                                addToCart(product._id);
                                navigate("/cart");
                            }}
                            className="w-full py-3.5 cursor-pointer font-medium bg-primary-500 text-white hover:bg-primary-500 transition rounded"
                        >
                            Buy Now
                        </button>

                    </div>
                </div>
            </div>
            {/* {Related Products} */}
            <div className="flex flex-col items-center mt-20">
                <div className="flex flex-col items-center w-max">
                    <p className="text-3xl font-medium">Related Products</p>
                    <div className="w-20 h-0.5 bg-primary rounded-full mt-2"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3md:grid-cols-4
                gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
                    {

                        relatedProducts
                            .filter((product) => product.inStock)
                            .map((product, index) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))
                    }
                </div>
                <button onClick={() => { navigate(`/products`); scrollTo(0, 0) }} className="mx-auto cursor-pointer px-12 my-16 py-2.5 border 
                rounded text-primary hover:bg-primary-500/10 transition">See more</button>
            </div>
        </div>
    );
};

export default ProductDetails;