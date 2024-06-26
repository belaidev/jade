import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { PopularCourse } from "~/services/courseData-service";

type CartContextType = {
	cart: PopularCourse[];
	addToCart: (course: PopularCourse) => void;
	removeFromCart: (courseId: number) => void;
	clearCart: () => void;
	isInCart: (courseId: number) => boolean;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartProviderProps = {
	children: ReactNode;
};

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
	const [cart, setCart] = useState<PopularCourse[]>(() => {
		if (typeof window !== "undefined") {
			const savedCart = localStorage.getItem("cart");
			return savedCart ? JSON.parse(savedCart) : [];
		}
		return [];
	});

	useEffect(() => {
		if (typeof window !== "undefined") {
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	}, [cart]);

	const addToCart = (course: PopularCourse) => {
		if (!isInCart(course.id)) {
			setCart((prevCart) => [...prevCart, course]);
		}
	};

	const removeFromCart = (courseId: number) => {
		setCart((prevCart) => prevCart.filter((course) => course.id !== courseId));
	};

	const clearCart = () => {
		setCart([]);
	};

	const isInCart = (courseId: number) => {
		return cart.some((course) => course.id === courseId);
	};

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, isInCart }}>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = (): CartContextType => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error("useCart must be used within a CartProvider");
	}
	return context;
};
