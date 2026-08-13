
import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "../context/AppContext";

const BestSeller = () => {
    const { products } = useAppContext();

    return (
        <section className="mt-10 sm:mt-14 md:mt-16 lg:mt-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">

            {/* Heading */}
            <div className=" text-center mb-6 sm:mb-8 md:mb-10">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800">
                    Best Sellers
                </h2>
            </div>

            {/* Products */}

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
                {products
                    ?.filter((product) => product.inStock)
                    .slice(0, 5)
                    .map((product, index) => (
                        <ProductCard
                            key={product._id || index}
                            product={product}
                        />
                    ))}
            </div>


        </section>
    );
};

export default BestSeller;
