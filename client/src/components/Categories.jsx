
import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
    const { navigate } = useAppContext();

    return (
        <section className="mt-10 px-4 sm:px-6 lg:px-8">

            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6">
                Categories
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="group cursor-pointer py-5 px-3 gap-2 rounded-lg flex flex-col justify-center items-center transition-transform duration-200 hover:scale-105"
                        style={{ backgroundColor: category.bgColor }}
                        onClick={() => {
                            navigate(`/products/${category.path.toLowerCase()} `);
                            scrollTo(0, 0);
                        }}
                    >
                        <img
                            src={category.image}
                            alt={category.text}
                            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                        />

                        <p className="text-sm sm:text-base font-medium text-center">
                            {category.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;