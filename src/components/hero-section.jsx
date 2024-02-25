import React, { useEffect, useState } from "react";
import "./components.css"
import jsonData from './data.json';

export default function HeroSection() {

    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [activeUserId, setActiveUserId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleAddToCart = (product) => {
        setCart(prevCart => [...prevCart, { ...product, quantity: 1 }]);
        updateTotalPrice([...cart, { ...product, quantity: 1 }]);
        console.log('Added to cart:', product);
    };

    const handleIncrement = (index) => {
        setCart(prevCart => {
            const newCart = [...prevCart];
            newCart[index].quantity += 1;
            return newCart;
        });
        updateTotalPrice([...cart]);
    };

    const handleDecrement = (index) => {
        setCart(prevCart => {
            const newCart = [...prevCart];
            if (newCart[index].quantity > 1) {
                newCart[index].quantity -= 1;
            }
            return newCart;
        });
        updateTotalPrice([...cart]);
    };

    const handleDelete = (index) => {
        setCart(prevCart => {
            const newCart = [...prevCart];
            newCart.splice(index, 1);
            return newCart;
        });
        updateTotalPrice([...cart]);
    };

    const updateTotalPrice = (updatedCart) => {
        const newTotalPrice = updatedCart.reduce((acc, cartProduct) => acc + (parseFloat(cartProduct.price) * cartProduct.quantity), 0);
        setTotalPrice(newTotalPrice);
    };

    const handleBuyNow = () => {
        alert('purchase done')
        setCart([]);
        setTotalPrice(0);
    }
    useEffect(() => {
        const newTotalPrice = cart.reduce((acc, cartProduct) => acc + (parseFloat(cartProduct.price) * cartProduct.quantity), 0);
        setTotalPrice(newTotalPrice);
    }, [cart]);

    const userWithId1 = jsonData.users.find(user => user.id === 1);
    const userWithId2 = jsonData.users.find(user => user.id === 2);
    const userWithId3 = jsonData.users.find(user => user.id === 3);
    const userWithId4 = jsonData.users.find(user => user.id === 4);
    const userWithId5 = jsonData.users.find(user => user.id === 5);


    const handleSearch = (e) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);
        if (newSearchTerm.length >= 3) {
            const results = filterData(jsonData, newSearchTerm);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const filterData = (data, term) => {
        return data.users.flatMap(user =>
            user.sub_categories.flatMap(subCategory =>
                subCategory.product.filter(product =>
                    product.variation_name.toLowerCase().includes(term.toLowerCase())
                )
            )
        );
    };

    const handleUserClick = (userId) => {
        setActiveUserId(userId);
    };


    return (
        <div>
            <section className="hero">
                <div className="container mx-auto">
                    <div className="flex justify-center pt-[13%]">
                        <div className="text-white text-6xl font-bold ">Order Now</div>
                    </div>
                    <div className="flex justify-center pt-4 ">
                        <nav aria-label="breadcrumb">
                            <ol class="flex items-center p-4 space-x-2 list-none">
                                <li class="text-white text-lg font-medium">Home</li>
                                <li class=""><svg class="" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.22234 3.68784L2.66224 0.127804C2.5799 0.045398 2.46999 0 2.35278 0C2.23558 0 2.12566 0.045398 2.04332 0.127804L1.78115 0.389916C1.61055 0.560711 1.61055 0.838302 1.78115 1.00884L4.77065 3.99834L1.77783 6.99116C1.69549 7.07357 1.65002 7.18342 1.65002 7.30056C1.65002 7.41783 1.69549 7.52768 1.77783 7.61015L2.04 7.8722C2.12241 7.9546 2.23226 8 2.34947 8C2.46667 8 2.57659 7.9546 2.65893 7.8722L6.22234 4.30891C6.30488 4.22624 6.35021 4.11587 6.34995 3.99854C6.35021 3.88075 6.30488 3.77044 6.22234 3.68784Z" fill="#FEFEFE"></path></svg></li>
                                <li class="text-[#ff7426] text-lg font-medium">Order Now</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <div className="pt-20">
                    <img src="https://mex-chicken.eezzypos.com/src/assets/media/overlay-bg2.webp" width={'100%'} />
                </div>
                <section className="container mx-auto px-10 mt-20">
                    <div class="w-full h-16 bg-[#fbecc4] rounded-md flex justify-between items-center px-10">
                        <div className="text-base  font-medium ">Open at 9:00 AM to 11:00 PM</div>
                        <div className="text-sm font-medium">Takeaway is closed. <span className="text-[#FF7426]">Pre-order</span> now for later</div>
                    </div>
                </section>
                <section className="container mx-auto px-10 pt-10">
                    <div class="grid grid-cols-9 gap-4">
                        <div className="lg:col-span-2">
                            <div class="bg-white p-4 rounded-md sticky top-28">
                                <h2 class="text-xl font-semibold mb-4">Menu Items</h2>
                                <div class="flex flex-col gap-10 pt-4">
                                    {jsonData.users.map(user => (
                                        <div
                                            className={`text-base cursor-pointer font-normal ${activeUserId === user.id ? 'text-[#FF7426]' : 'text-[#020202] hover:text-[#FF7426]'
                                                }`}
                                            key={user.id}
                                            onClick={() => handleUserClick(user.id)}
                                        >
                                            {user.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-4">
                            <div class="relative flex items-center sticky top-[98px]">
                                <div class="absolute left-2 top-1/2 transform -translate-y-1/2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        class="w-6 h-6 text-gray-500"
                                    >
                                        <circle cx="11" cy="11" r="8"></circle>
                                        <path d="M21 21l-4.35-4.35"></path>
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full p-2 pl-16 rounded-md focus:outline-none"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                />

                                {/* {searchResults.length > 0 ? (
                                        <div>
                                            {searchResults.map(product => (
                                                <div key={product.product_id} className="flex justify-between items-center">
                                                    <div>{product.variation_name}</div>
                                                    <div>
                                                        ${product.price}
                                                        <button
                                                            className="bg-[#ff7426] text-white font-medium py-2.5 px-5 rounded-lg ml-4"
                                                            onClick={() => handleAddToCart(product)}>
                                                            Add
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p>No results found.</p>
                                    )} */}

                                <svg
                                    class="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-500"
                                    width="37"
                                    height="37"
                                    viewBox="0 0 37 37"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g id="Menu drop down" clip-path="url(#clip0_17_4472)">
                                        <g id="Group 625609">
                                            <g id="Group 625182">
                                                <path
                                                    id="Vector"
                                                    d="M9.25112 27.7533C8.55672 27.0588 8.55671 25.9335 9.25112 25.2391L25.239 9.25121C25.9334 8.5568 27.0588 8.5568 27.7532 9.25121C28.4476 9.94561 28.4476 11.0709 27.7532 11.7653L11.7653 27.7533C11.0709 28.4477 9.94552 28.4477 9.25112 27.7533Z"
                                                    fill="currentColor"
                                                ></path>
                                                <path
                                                    id="Vector_2"
                                                    d="M25.2386 27.7533L9.25074 11.7653C8.55634 11.0709 8.55634 9.94561 9.25074 9.25121C9.94515 8.5568 11.0705 8.5568 11.7649 9.25121L27.7528 25.2391C28.4472 25.9335 28.4472 27.0588 27.7528 27.7533C27.0584 28.4477 25.9331 28.4477 25.2386 27.7533Z"
                                                    fill="currentColor"
                                                ></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                            <div className="pt-6">
                                <div class="bg-white p-4 rounded-md px-2">
                                    {userWithId1 && (
                                        <div className="bg-white rounded-md">
                                            <h2 className="text-xl font-semibold mb-4 text-[#ff7426]">{userWithId1.name}</h2>
                                            <div className="flex flex-col gap-10 pt-4">
                                                {userWithId1.sub_categories && userWithId1.sub_categories.map(subCategory => (
                                                    <React.Fragment key={subCategory.sub_cat_id}>
                                                        <h2 className="font-bold">{subCategory.sub_cat_name}</h2>
                                                        {subCategory.product && subCategory.product.map(product => (
                                                            <div key={product.product_id} className="flex justify-between items-center">
                                                                <div>
                                                                    {product.variation_name}
                                                                </div>
                                                                <div>
                                                                    ${product.price}
                                                                    <button
                                                                        className="bg-[#ff7426] text-white font-medium py-2.5 px-5 rounded-lg ml-4"
                                                                        onClick={() => handleAddToCart(product)}>
                                                                        Add
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="pt-2">
                                    <div className="bg-white p-4 rounded-md px-2">
                                        <h2 className="text-xl font-semibold mb-4 text-[#ff7426]">{userWithId2?.name}</h2>
                                        <div className="flex flex-col gap-10 pt-4">
                                            {userWithId2?.sub_categories && userWithId2.sub_categories.map(subCategory => (
                                                <React.Fragment key={subCategory.sub_cat_id}>
                                                    <h2 className="font-bold">{subCategory.sub_cat_name}</h2>
                                                    {subCategory.product && subCategory.product.map(product => (
                                                        <div key={product.product_id} className="flex justify-between items-center ">
                                                            <div>
                                                                {product.variation_name}
                                                            </div>
                                                            <div>
                                                                ${product.price}
                                                                <button
                                                                    className="bg-[#ff7426] text-white font-medium py-2.5 px-5 rounded-lg ml-4"
                                                                    onClick={() => handleAddToCart(product)}>
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="pt-2">
                                    <div className="bg-white p-4 rounded-md px-2">
                                        <h2 className="text-xl font-semibold mb-4 text-[#ff7426]">{userWithId3?.name}</h2>
                                        <div className="flex flex-col gap-10 pt-4">
                                            {userWithId3?.sub_categories && userWithId3.sub_categories.map(subCategory => (
                                                <React.Fragment key={subCategory.sub_cat_id}>
                                                    <h2 className="font-bold">{subCategory.sub_cat_name}</h2>
                                                    {subCategory.product && subCategory.product.map(product => (
                                                        <div key={product.product_id} className="flex justify-between items-center">
                                                            <div>
                                                                {product.variation_name}
                                                            </div>
                                                            <div>
                                                                ${product.price}
                                                                <button
                                                                    className="bg-[#ff7426] text-white font-medium py-2.5 px-5 rounded-lg ml-4"
                                                                    onClick={() => handleAddToCart(product)}>
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="pt-2">
                                    <div className="bg-white p-4 rounded-md px-2">
                                        <h2 className="text-xl font-semibold mb-4 text-[#ff7426]">{userWithId4?.name}</h2>
                                        <div className="flex flex-col gap-10 pt-4">
                                            {userWithId4?.sub_categories && userWithId4.sub_categories.map(subCategory => (
                                                <React.Fragment key={subCategory.sub_cat_id}>
                                                    <h2 className="font-bold">{subCategory.sub_cat_name}</h2>
                                                    {subCategory.product && subCategory.product.map(product => (
                                                        <div key={product.product_id} className="flex justify-between items-center">
                                                            <div>
                                                                {product.variation_name}
                                                            </div>
                                                            <div>
                                                                ${product.price}
                                                                <button
                                                                    className="bg-[#ff7426] text-white font-medium py-2.5 px-5 rounded-lg ml-4"
                                                                    onClick={() => handleAddToCart(product)}>
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-2">
                                <div className="pt-2">
                                    <div className="bg-white p-4 rounded-md px-2">
                                        <h2 className="text-xl font-semibold mb-4 text-[#ff7426]">{userWithId5?.name}</h2>
                                        <div className="flex flex-col gap-10 pt-4">
                                            {userWithId5?.sub_categories && userWithId5.sub_categories.map(subCategory => (
                                                <React.Fragment key={subCategory.sub_cat_id}>
                                                    <h2 className="font-bold">{subCategory.sub_cat_name}</h2>
                                                    {subCategory.product && subCategory.product.map(product => (
                                                        <div key={product.product_id} className="flex justify-between items-center">
                                                            <div>
                                                                {product.variation_name}
                                                            </div>
                                                            <div>
                                                                ${product.price}
                                                                <button
                                                                    className="bg-[#ff7426] text-white font-medium py-2.5 px-5 rounded-lg ml-4"
                                                                    onClick={() => handleAddToCart(product)}>
                                                                    Add
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div class="bg-white p-4 rounded-md sticky top-28">
                                <h2 class="text-xl font-semibold mb-4">Your Cart</h2>
                                <div className="flex flex-col gap-10 pt-4">
                                    {cart.length === 0 ? (
                                        <>
                                            <div className="flex justify-center items-center">
                                                <div>
                                                    <svg width="200" height="200" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_94_44754)"><path d="M25.0929 13.046C24.9759 12.9021 24.8004 12.8185 24.6149 12.8185H13.4574L13.4117 12.3987L13.4101 12.3852C13.1914 10.7184 11.7588 9.46143 10.0777 9.46143C9.73745 9.46143 9.46167 9.7372 9.46167 10.0774C9.46167 10.4176 9.73745 10.6934 10.0777 10.6934C11.1404 10.6934 12.0464 11.4864 12.1878 12.5391L12.92 19.2657C12.2796 19.5564 11.8332 20.2018 11.8332 20.9496C11.8332 20.9547 11.8333 20.9598 11.8334 20.965C11.8333 20.9701 11.8332 20.9752 11.8332 20.9804C11.8332 21.9993 12.6622 22.8283 13.6812 22.8283H13.9318C13.8692 23.012 13.8352 23.2088 13.8352 23.4135C13.8352 24.4155 14.6503 25.2307 15.6523 25.2307C16.6543 25.2307 17.4695 24.4155 17.4695 23.4135C17.4695 23.2088 17.4355 23.012 17.3728 22.8283H20.0301C19.9675 23.012 19.9335 23.2088 19.9335 23.4135C19.9335 24.4155 20.7486 25.2307 21.7506 25.2307C22.7526 25.2307 23.5678 24.4155 23.5678 23.4135C23.5678 22.4115 22.7526 21.5963 21.7506 21.5963H13.6812C13.3415 21.5963 13.0652 21.32 13.0652 20.9804C13.0652 20.9752 13.0651 20.9701 13.065 20.965C13.0651 20.9598 13.0652 20.9547 13.0652 20.9496C13.0652 20.6099 13.3415 20.3336 13.6812 20.3336H21.5452C22.6386 20.3336 23.6421 19.657 24.1017 18.61C24.2384 18.2985 24.0967 17.9351 23.7852 17.7984C23.4737 17.6616 23.1104 17.8033 22.9736 18.1148C22.7146 18.7051 22.1405 19.1016 21.5452 19.1016H14.1413L13.5915 14.0505H23.8572L23.5558 15.4955C23.4863 15.8285 23.7 16.1548 24.033 16.2243C24.0754 16.2331 24.1177 16.2374 24.1594 16.2374C24.445 16.2374 24.7012 16.0377 24.7618 15.7471L25.2179 13.5603C25.2558 13.3788 25.2099 13.1899 25.0929 13.046ZM21.7506 22.8283C22.0733 22.8283 22.3358 23.0908 22.3358 23.4135C22.3358 23.7362 22.0733 23.9987 21.7506 23.9987C21.4279 23.9987 21.1654 23.7362 21.1654 23.4135C21.1654 23.0908 21.4279 22.8283 21.7506 22.8283ZM15.6523 22.8283C15.975 22.8283 16.2375 23.0908 16.2375 23.4135C16.2375 23.7362 15.975 23.9987 15.6523 23.9987C15.3296 23.9987 15.0671 23.7362 15.0671 23.4135C15.0671 23.0908 15.3296 22.8283 15.6523 22.8283Z" fill="#000"></path></g><defs><clipPath id="clip0_94_44754"><rect width="15.7692" height="15.7692" fill="black" transform="translate(9.46167 9.46143)"></rect></clipPath></defs></svg>
                                                </div>
                                            </div>
                                            <div className=" flex justify-center items-center -mt-10">
                                                <div className=" text-lg font-medium">Cart is empty. Select any items to fill the cart.</div>
                                            </div>
                                        </>

                                    ) : (
                                        <>
                                            {cart.map((cartProduct, index) => (
                                                <div key={index} className="flex justify-between">
                                                    <p>
                                                        {cartProduct.variation_name} - ${parseFloat(cartProduct.price * cartProduct.quantity).toFixed(2)} x {cartProduct.quantity}
                                                    </p>
                                                    <div className="flex gap-2">
                                                        <button
                                                            className="bg-[#ff7426] text-white font-medium px-2 rounded-md"
                                                            onClick={() => handleDecrement(index)}>
                                                            -
                                                        </button>
                                                        <button
                                                            className="bg-[#ff7426] text-white font-medium px-2 rounded-md"
                                                            onClick={() => handleIncrement(index)}>
                                                            +
                                                        </button>


                                                        <button
                                                            className="bg-[#ff7426] text-white font-medium py-1 px-2 rounded-md"
                                                            onClick={() => handleDelete(index)}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {totalPrice !== 0 && (
                                                <p>Total Price: ${totalPrice.toFixed(2)}</p>
                                            )}
                                            <button
                                                className="bg-[#00cc00] text-white font-medium py-1 px-2 rounded-md"
                                                onClick={handleBuyNow}>
                                                Buy Now
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pt-10">
                    <div className="grid grid-cols-7 gap-0 w-full">
                        <div className="w-full max-w-[100%] mx-auto ">
                            <img src="https://dev-restaurant.eezzypos.com/1-1-DSIYK2lMLpVqDJJZaAF1.png" className="w-full h-[224px] " />
                        </div>
                        <div className="w-full max-w-[100%] mx-auto">
                            <img src="https://dev-restaurant.eezzypos.com/1-1-ZBwecklSN0oFiGhbO8L8.png" className="w-full h-[224px]" />
                        </div>
                        <div className="w-full max-w-[100%] mx-auto">
                            <img src="https://dev-restaurant.eezzypos.com/1-1-CmyJL4HcUAOYlOtqwc1b.png" className="w-full h-[224px]" />
                        </div>
                        <div className="w-full max-w-[100%] mx-auto">
                            <img src="https://dev-restaurant.eezzypos.com/1-1-N9V1mfa2tGOnnVrubJLO.png" className="w-full h-[224px]" />
                        </div>
                        <div className="w-full max-w-[100%] mx-auto">
                            <img src="https://dev-restaurant.eezzypos.com/1-1-HYf3U1iz3EYqpXJ6DGlT.png" className="w-full h-[224px]" />
                        </div>
                        <div className="w-full max-w-[100%] mx-auto">
                            <img src="https://dev-restaurant.eezzypos.com/1-1-OEYb4DkWmKaJAJxaAWDl.png" className="w-full h-[224px]" />
                        </div>
                        <div className="w-full max-w-[100%] mx-auto">
                            <img src="https://dev-restaurant.eezzypos.com/1-1-pMYtE81qVF7WINshGW7p.png" className="w-full h-[224px]" />
                        </div>
                    </div>
                    <div className="bg-[#000]">
                        <div className="container mx-auto pt-12">
                            <nav className=" mx-auto  z-10 bg-opacity-100 shadow-md ">
                                <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto py-2 px-12">
                                    <div>
                                        <img src="https://dev-restaurant.eezzypos.com/1-1-2HQiEIK9KRP3GqR2kqNg.png" className="h-9 md:h-16 lg:h-14 rounded-md" />
                                    </div>
                                    <ul className="flex p-4 md:p-0 gap-10 items-center md:space-x-4 mt-2 pt-5">
                                        <li><a href="#" className="text-white text-base font-semibold hover:text-[#ff7426] pt-20">Home</a></li>
                                        <li><a href="#" className="text-white text-base font-semibold hover:text-[#ff7426] pt-20">About</a></li>
                                        <li><a href="#" className="text-white text-base font-semibold hover:text-[#ff7426] pt-20">Order Now</a></li>
                                        <li><a href="#" className="text-white text-base font-semibold hover:text-[#ff7426] pt-20">Contact</a></li>
                                    </ul>
                                </div>
                            </nav>
                            <div className="pt-10 flex justify-center items-center gap-7">
                                <div className="text-white">
                                    <a
                                        className="border border-white rounded-full hover:bg-[#ff7426] hover:border-[#ff7426] transition-all duration-100 cursor-pointer inline-block"
                                        style={{ borderRadius: '50%' }}
                                    >
                                        <svg class="" width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_32_10493)"><path d="M28.2165 39.9999C28.1437 39.9999 28.0708 39.9999 27.9975 39.9996C26.273 40.0038 24.6797 39.96 23.1301 39.8657C21.7094 39.7792 20.4127 39.2883 19.3797 38.446C18.3831 37.6333 17.7024 36.5344 17.3568 35.1802C17.0561 34.0013 17.0401 32.844 17.0248 31.7246C17.0138 30.9214 17.0023 29.9698 17 29.002C17.0023 28.0301 17.0138 27.0784 17.0248 26.2753C17.0401 25.1561 17.0561 23.9988 17.3568 22.8197C17.7024 21.4655 18.3831 20.3666 19.3797 19.5539C20.4127 18.7116 21.7094 18.2207 23.1303 18.1342C24.6798 18.0401 26.2735 17.9961 28.0017 18.0003C29.7266 17.9966 31.3195 18.0401 32.8691 18.1342C34.2897 18.2207 35.5865 18.7116 36.6194 19.5539C37.6163 20.3666 38.2967 21.4655 38.6423 22.8197C38.9431 23.9986 38.959 25.1561 38.9743 26.2753C38.9854 27.0784 38.997 28.0301 38.9992 28.9979V29.002C38.997 29.9698 38.9854 30.9214 38.9743 31.7246C38.959 32.8438 38.9433 34.0011 38.6423 35.1802C38.2967 36.5344 37.6163 37.6333 36.6194 38.446C35.5865 39.2883 34.2897 39.7792 32.8691 39.8657C31.3851 39.956 29.8607 39.9999 28.2165 39.9999ZM27.9975 38.2809C29.6939 38.2849 31.2515 38.2421 32.7647 38.1501C33.8389 38.0848 34.7703 37.7362 35.5333 37.114C36.2386 36.5388 36.7243 35.7452 36.9769 34.7552C37.2274 33.7738 37.2418 32.7201 37.2557 31.7011C37.2666 30.9033 37.2781 29.9583 37.2804 28.9999C37.2781 28.0414 37.2666 27.0966 37.2557 26.2988C37.2418 25.2798 37.2274 24.226 36.9769 23.2445C36.7243 22.2545 36.2386 21.4609 35.5333 20.8857C34.7703 20.2637 33.8389 19.9151 32.7647 19.8498C31.2515 19.7576 29.6939 19.7152 28.0015 19.7189C26.3054 19.7148 24.7476 19.7576 23.2345 19.8498C22.1603 19.9151 21.2289 20.2637 20.4659 20.8857C19.7606 21.4609 19.2748 22.2545 19.0222 23.2445C18.7718 24.226 18.7574 25.2796 18.7434 26.2988C18.7325 27.0972 18.7211 28.0427 18.7187 29.002C18.7211 29.957 18.7325 30.9026 18.7434 31.7011C18.7574 32.7201 18.7718 33.7738 19.0222 34.7552C19.2748 35.7452 19.7606 36.5388 20.4659 37.114C21.2289 37.736 22.1603 38.0846 23.2345 38.1499C24.7476 38.2421 26.3058 38.285 27.9975 38.2809ZM27.9565 34.371C24.995 34.371 22.5854 31.9616 22.5854 28.9999C22.5854 26.0383 24.995 23.6288 27.9565 23.6288C30.9182 23.6288 33.3276 26.0383 33.3276 28.9999C33.3276 31.9616 30.9182 34.371 27.9565 34.371ZM27.9565 25.3476C25.9427 25.3476 24.3042 26.9861 24.3042 28.9999C24.3042 31.0138 25.9427 32.6523 27.9565 32.6523C29.9705 32.6523 31.6089 31.0138 31.6089 28.9999C31.6089 26.9861 29.9705 25.3476 27.9565 25.3476ZM33.9292 21.9101C33.2173 21.9101 32.6401 22.4872 32.6401 23.1992C32.6401 23.9112 33.2173 24.4882 33.9292 24.4882C34.6412 24.4882 35.2182 23.9112 35.2182 23.1992C35.2182 22.4872 34.6412 21.9101 33.9292 21.9101Z" fill="#FEFEFE"></path></g><defs><clipPath id="clip0_32_10493"><rect width="22" height="22" fill="white" transform="translate(17 18)"></rect></clipPath></defs></svg>
                                    </a>
                                </div>

                                <div className="text-white">
                                    <a
                                        className="border border-white rounded-full hover:bg-[#ff7426] hover:border-[#ff7426] transition-all duration-100 cursor-pointer inline-block"
                                        style={{ borderRadius: '50%' }}
                                    >
                                        <svg class="h-14" width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M33.625 22.625C34.0131 22.625 34.3281 22.31 34.3281 21.9219V17.7031C34.3281 17.315 34.0131 17 33.625 17H29.4062C26.6921 17 24.4843 19.2078 24.4843 21.9219V25.4375H22.375C21.9868 25.4375 21.6718 25.7525 21.6718 26.1406V30.3594C21.6718 30.7475 21.9868 31.0625 22.375 31.0625H24.4843V40.2969C24.4843 40.685 24.7993 41 25.1875 41H29.4062C29.7943 41 30.1093 40.685 30.1093 40.2969V31.0625H32.9218C33.2654 31.0625 33.5589 30.8141 33.6156 30.4752L34.3187 26.2564C34.3525 26.0525 34.2953 25.8439 34.1617 25.6859C34.0281 25.5284 33.8317 25.4375 33.625 25.4375H30.1093V22.625H33.625ZM29.4062 26.8438H32.7948L32.326 29.6562H29.4062C29.0181 29.6562 28.7031 29.9712 28.7031 30.3594V39.5938H25.8906V30.3594C25.8906 29.9712 25.5756 29.6562 25.1875 29.6562H23.0781V26.8438H25.1875C25.5756 26.8438 25.8906 26.5288 25.8906 26.1406V21.9219C25.8906 19.9836 27.4679 18.4062 29.4062 18.4062H32.9218V21.2188H29.4062C29.0181 21.2188 28.7031 21.5338 28.7031 21.9219V26.1406C28.7031 26.5288 29.0181 26.8438 29.4062 26.8438Z" fill="#FEFEFE"></path></svg>
                                    </a>
                                </div>
                                <div className="text-white">
                                    <a
                                        className="border border-white rounded-full hover:bg-[#ff7426] hover:border-[#ff7426] transition-all duration-100 cursor-pointer inline-block"
                                        style={{ borderRadius: '50%' }}
                                    >
                                        <svg class="h-14" width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_32_10491)"><path d="M32.0402 27.4664L26.9589 24.6861C26.6668 24.5263 26.3214 24.5322 26.0351 24.7019C25.7485 24.8718 25.5776 25.1718 25.5776 25.5049V31.0177C25.5776 31.3491 25.7474 31.6487 26.0321 31.8187C26.1807 31.9075 26.3455 31.9521 26.5106 31.9521C26.6618 31.9521 26.8135 31.9147 26.953 31.8396L32.0344 29.1072C32.336 28.9449 32.5243 28.6314 32.5257 28.2887C32.5269 27.9459 32.3409 27.631 32.0402 27.4664ZM26.9254 30.3242V26.204L30.7231 28.282L26.9254 30.3242Z" fill="#FEFEFE"></path><path d="M39.8308 23.8967L39.8297 23.8862C39.8102 23.7011 39.6163 22.0544 38.8158 21.2169C37.8905 20.2317 36.8415 20.1121 36.337 20.0547C36.2953 20.0499 36.257 20.0456 36.2228 20.041L36.1826 20.0368C33.142 19.8157 28.55 19.7855 28.504 19.7853L28.5 19.7852L28.4959 19.7853C28.4499 19.7855 23.8579 19.8157 20.7899 20.0368L20.7494 20.041C20.7167 20.0454 20.6808 20.0494 20.6416 20.054C20.1429 20.1115 19.1052 20.2314 18.1773 21.2521C17.4148 22.0807 17.1944 23.6921 17.1718 23.8732L17.1692 23.8967C17.1623 23.9738 17 25.8077 17 27.6488V29.3698C17 31.2109 17.1623 33.0448 17.1692 33.122L17.1704 33.1336C17.1899 33.3158 17.3836 34.9323 18.1804 35.7701C19.0504 36.7223 20.1505 36.8483 20.7422 36.916C20.8357 36.9267 20.9163 36.9358 20.9712 36.9455L21.0244 36.9529C22.78 37.1199 28.2845 37.2022 28.5179 37.2055L28.5249 37.2057L28.5319 37.2055C28.5779 37.2054 33.1697 37.1752 36.2103 36.9541L36.2505 36.9499C36.289 36.9448 36.3321 36.9402 36.3795 36.9353C36.8754 36.8827 37.9075 36.7733 38.8226 35.7665C39.5851 34.9377 39.8057 33.3263 39.8281 33.1454L39.8308 33.1219C39.8376 33.0447 40.0001 31.2109 40.0001 29.3698V27.6488C39.9999 25.8077 39.8376 23.9739 39.8308 23.8967ZM38.6521 29.3698C38.6521 31.0739 38.5033 32.8288 38.4892 32.9899C38.432 33.4337 38.1995 34.4532 37.8281 34.857C37.2553 35.4871 36.6669 35.5496 36.2374 35.595C36.1854 35.6005 36.1373 35.6057 36.0938 35.6112C33.1529 35.8238 28.7342 35.8565 28.5307 35.8577C28.3024 35.8544 22.8784 35.7714 21.1763 35.6133C21.0891 35.5991 20.9949 35.5882 20.8956 35.577C20.3918 35.5192 19.7021 35.4403 19.1719 34.857L19.1594 34.8436C18.7944 34.4634 18.5686 33.51 18.5112 32.9952C18.5005 32.8734 18.3478 31.0977 18.3478 29.3698V27.6488C18.3478 25.9466 18.4963 24.1936 18.5107 24.0292C18.5789 23.5065 18.8158 22.5487 19.1719 22.1616C19.7622 21.5124 20.3846 21.4404 20.7962 21.3929C20.8355 21.3883 20.8722 21.3841 20.9061 21.3797C23.8899 21.166 28.3403 21.1342 28.5 21.133C28.6596 21.134 33.1085 21.166 36.0658 21.3797C36.1021 21.3843 36.1417 21.3888 36.1844 21.3937C36.6078 21.442 37.2478 21.515 37.8351 22.1414L37.8405 22.1472C38.2055 22.5275 38.4313 23.4975 38.4887 24.0227C38.4989 24.1377 38.6521 25.9172 38.6521 27.6488V29.3698Z" fill="#FEFEFE"></path></g><defs><clipPath id="clip0_32_10491"><rect width="23" height="23" fill="white" transform="translate(17 17)"></rect></clipPath></defs></svg>
                                    </a>
                                </div>

                                <div className="text-white">
                                    <a
                                        className="border border-white rounded-full hover:bg-[#ff7426] hover:border-[#ff7426] transition-all duration-100 cursor-pointer inline-block"
                                        style={{ borderRadius: '50%' }}
                                    >
                                        <svg class="h-14" width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M40.8359 22.0169L40.8284 22.0075C40.828 22.007 40.8275 22.0065 40.827 22.0056C40.8266 22.0051 40.8256 22.0042 40.8252 22.0037L40.8177 21.9948C40.6311 21.7787 40.3813 21.7126 40.1567 21.7525C40.0546 21.753 39.9547 21.7553 39.8568 21.7595C40.0466 21.4642 40.2135 21.1324 40.3386 20.7597C40.4244 20.5038 40.356 20.2216 40.1633 20.0332C39.9702 19.8447 39.6866 19.7833 39.433 19.8747C39.193 19.9615 37.604 20.5324 37.0532 20.7377C37.0326 20.7456 37.0181 20.7494 37.0096 20.7513C36.9937 20.7433 36.9571 20.7222 36.8943 20.6692C35.4188 19.4383 33.4519 19.0596 31.6332 19.6563C29.8895 20.2286 28.5902 21.618 28.158 23.3734C28.0376 23.8641 28.0193 24.3615 28.0043 24.8433C24.7367 24.4763 21.9281 23.0031 19.6463 20.4574C19.4939 20.2877 19.2689 20.2024 19.0421 20.2282C18.8152 20.2544 18.6155 20.3889 18.5058 20.5891C17.9724 21.5631 17.7441 22.5043 17.8083 23.4653C17.8636 24.2968 18.0961 25.0547 18.5025 25.7353C18.3282 25.7255 18.1538 25.7808 18.016 25.8938C17.8411 26.0367 17.746 26.2547 17.7601 26.4802C17.8365 27.7429 18.2368 28.821 18.9497 29.6844C19.1503 29.9277 19.3739 30.1537 19.6223 30.3636C19.5708 30.4058 19.5253 30.456 19.4873 30.5127C19.3566 30.7063 19.3308 30.9528 19.4184 31.1694C20.0512 32.7317 21.0867 33.7793 22.5613 34.3395C21.0811 35.059 19.4925 35.358 17.7465 35.2512C17.4249 35.2315 17.131 35.433 17.033 35.74C16.9355 36.0471 17.0593 36.3813 17.3335 36.551C19.6181 37.9651 22.3129 38.6209 24.913 38.6209C27.5777 38.6209 30.1253 37.899 32.3485 36.5036C33.5963 35.7204 34.7021 34.7463 35.6348 33.6092C36.1069 33.034 36.5287 32.4233 36.899 31.782C37.2693 31.1408 37.5871 30.4682 37.8506 29.7693C38.4224 28.2506 38.7252 26.6367 38.7501 24.9718C38.7618 24.9352 38.8091 24.8466 38.8837 24.7697C39.2394 24.4004 39.6369 24.0305 40.0217 23.6729C40.2364 23.4732 40.4572 23.2679 40.6724 23.0612C40.8831 22.927 41 22.6963 41 22.4659C41 22.3154 40.9503 22.1589 40.8359 22.0169ZM37.8712 23.7938C37.7493 23.9199 37.3518 24.3755 37.3439 24.9329C37.3237 26.4417 37.0514 27.9018 36.5343 29.2734C34.5647 34.5012 29.4077 37.6708 23.7008 37.1603C22.5679 37.0591 21.4959 36.836 20.4928 36.4938C22.0284 36.2083 23.4575 35.5905 24.8136 34.632C25.0512 34.4637 25.1609 34.1665 25.0892 33.8848C25.0175 33.6026 24.7794 33.3936 24.4906 33.3593C22.9757 33.1803 21.9351 32.6286 21.2334 31.6086H21.9665C22.3045 31.6086 22.5951 31.3677 22.6574 31.0353C22.7198 30.703 22.5365 30.373 22.2215 30.2502C20.6245 29.6287 19.6838 28.7076 19.3228 27.3919C19.7484 27.5039 20.1647 27.6136 20.5861 27.7251C20.9189 27.8128 21.2662 27.6468 21.4073 27.3328C21.5479 27.0187 21.4406 26.6489 21.1537 26.4591C19.9312 25.65 19.2961 24.6404 19.2113 23.372C19.1845 22.9721 19.2286 22.5812 19.3481 22.18C21.9154 24.6971 25.033 26.085 28.6301 26.3091C29.0144 26.333 29.3467 26.0433 29.3749 25.6589C29.3936 25.4063 29.4011 25.1644 29.4082 24.9305C29.4217 24.4885 29.4349 24.0704 29.5235 23.7095C29.8436 22.4092 30.7726 21.4188 32.072 20.9922C33.4266 20.5478 34.8924 20.8305 35.9934 21.7492C36.1748 21.9001 36.7261 22.3604 37.5445 22.0553C37.6251 22.0253 37.7053 21.9958 37.7859 21.9658C37.7193 22.0206 37.6504 22.0755 37.5787 22.1303C37.2468 22.2946 37.0971 22.6928 37.2454 23.0378L37.2548 23.0603C37.4085 23.417 37.822 23.582 38.1787 23.4282C38.1829 23.4263 38.1876 23.4245 38.1918 23.4226C38.2129 23.4174 38.2345 23.4123 38.256 23.4071C38.1257 23.5346 37.9968 23.6635 37.8712 23.7938Z" fill="#FEFEFE"></path></svg>
                                    </a>
                                </div>
                            </div>
                            <div className="flex justify-center items-center pt-12">
                                <img src="https://dev-restaurant.eezzypos.com/1-1-2HQiEIK9KRP3GqR2kqNg.png" className="h-9 md:h-16 lg:h-14 rounded-md" />
                            </div>
                            <div className="flex justify-center items-center space-x-2 px-10 pt-10">
                                <p className="text-white">Mex Chicken</p>
                                <p className="text-[#ff7426]">|</p>
                                <p className="text-[#fff] text-center">Address : No: 40, 2nd floor, S.Kolathur, Viduthalai Nagar, Kovilambakkam, Chennai, Tamil Nadu 600129</p>
                                <p className="text-[#ff7426]">|</p>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                                <p className="text-white"><a href="mailto:anand@efficient-works.com">Email:anand@efficient-works.com</a></p>
                                <p className="text-[#ff7426]">|</p>
                                <p className="text-white"><a href="8124267987">Phone:8124267987</a></p>
                            </div>
                        </div>
                        <div className="flex container flex-wrap items-center justify-between mx-auto py-12 px-12">
                            <p className="text-white text-base font-semibold hover:text-[#ff7426]">©2024 Mex Chicken Developed by EezzyPOS</p>
                            <ul className="flex p-4 md:p-0 gap-10 items-center md:space-x-4 mt-2 pt-5">
                                <li><a href="#" className="text-white text-base font-semibold hover:text-[#ff7426] pt-20">Privacy Policy</a></li>
                                <li><a href="#" className="text-white text-base font-semibold hover:text-[#ff7426] pt-20">Terms & Condition</a></li>
                            </ul>

                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}