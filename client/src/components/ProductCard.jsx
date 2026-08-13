
import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
    const {
        currency,
        addToCart,
        removeFromCart,
        cartItems,
        navigate,
    } = useAppContext();

    return (
        product && (
            <div onClick={() => { navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0) }
            }
                className="w-full border border-gray-500/20 rounded-md
        px-3 py-3 sm:px-4 bg-white
        hover:shadow-md transition-shadow duration-200"
            >
                {/* Product Image */}
                <div className="group cursor-pointer flex items-center justify-center h-40 sm:h-44 md:h-48">
                    <img
                        className="max-h-32 sm:max-h-36 md:max-h-40
            max-w-full object-contain
            group-hover:scale-105 transition duration-300"
                        src={product.image[0]}
                        alt={product.name}
                    />
                </div>

                {/* Product Details */}
                <div className="text-gray-500/60 text-sm">
                    <p className="text-xs sm:text-sm">
                        {product.category}
                    </p>

                    <p className="text-gray-700 font-medium text-base sm:text-lg truncate w-full mt-1">
                        {product.name}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mt-1">
                        {Array(5)
                            .fill("")
                            .map((_, i) => (
                                <img
                                    key={i}
                                    className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                                    src={
                                        i < 4
                                            ? assets.star_icon
                                            : assets.star_dull_icon
                                    }
                                    alt="rating"
                                />
                            ))}

                        <p className="text-xs sm:text-sm ml-1">(4)</p>
                    </div>

                    {/* Price + Cart */}
                    <div className="flex items-end justify-between gap-2 mt-3">
                        <p className="text-primary-500 font-medium text-base sm:text-xl">
                            {currency}
                            {product.offerPrice}{" "}
                            <span className="text-gray-500/60 text-xs sm:text-sm line-through">
                                {currency}
                                {product.price}
                            </span>
                        </p>

                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="text-primary-500 shrink-0"
                        >
                            {!cartItems[product._id] ? (
                                <button
                                    className="cursor-pointer flex items-center justify-center gap-1
                  bg-primary-500/10 border border-primary-500/40
                  w-16 sm:w-20 h-8 rounded
                  text-primary-500 font-medium text-xs sm:text-sm"
                                    onClick={() => addToCart(product._id)}
                                >
                                    <img
                                        src={assets.cart_icon}
                                        alt="cart"
                                        className="w-4 h-4"
                                    />
                                    Add
                                </button>
                            ) : (
                                <div
                                    className="flex items-center justify-center gap-1 sm:gap-2
                  w-16 sm:w-20 h-8
                  bg-primary-500/25 rounded select-none"
                                >
                                    <button
                                        onClick={() => removeFromCart(product._id)}
                                        className="cursor-pointer text-md px-2 h-full"
                                    >
                                        -
                                    </button>

                                    <span className="w-4 sm:w-5 text-center text-sm">
                                        {cartItems[product._id]}
                                    </span>

                                    <button
                                        onClick={() => addToCart(product._id)}
                                        className="cursor-pointer text-md px-2 h-full"
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductCard;