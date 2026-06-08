import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  originalPrice: number;
  pixPrice: number;
  image: string;
  images: string[];
  weight: number; // em gramas
  dimensions: {
    length: number; // cm
    width: number; // cm
    height: number; // cm
  };
  stock: number;
  category: string;
  features: string[];
  featuresEn: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  shippingCost: number;
}

export interface ShippingInfo {
  cep: string;
  cost: number;
  days: number;
  method: string;
}

interface ProductContextType {
  products: Product[];
  cart: CartItem[];
  shippingInfo: ShippingInfo | null;
  addToCart: (product: Product, quantity: number, shippingCost: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setShippingInfo: (info: ShippingInfo) => void;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getCartShippingTotal: () => number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Produtos disponíveis
const PRODUCTS: Product[] = [
  {
    id: 'minicurso-robotica-001',
    name: 'Minicurso de Robótica + Kit Carrinho Bluetooth',
    nameEn: 'Robotics Minicourse + Bluetooth Car Kit',
    description: 'Minicurso completo de robótica com 4 aulas online ao vivo com o Prof. Dr. Giorgio Ernesto Testoni. Inclui kit completo com chassi 4WD, Arduino Uno, módulo Bluetooth, sensores e componentes. Acesso a grupo WhatsApp exclusivo com o professor para tirar dúvidas.',
    descriptionEn: 'Complete robotics minicourse with 4 live online classes with Prof. Dr. Giorgio Ernesto Testoni. Includes complete kit with 4WD chassis, Arduino Uno, Bluetooth module, sensors and components. Access to exclusive WhatsApp group with the professor to ask questions.',
    price: 547.00,
    originalPrice: 600.00,
    pixPrice: 525.12,
    image: '/images/minicurso-robotica.jpg',
    images: [
      '/images/minicurso-robotica.jpg',
      '/images/minicurso-robotica-2.jpg',
      '/images/minicurso-robotica-3.jpg',
    ],
    weight: 800, // gramas
    dimensions: {
      length: 32, // cm
      width: 19, // cm
      height: 9, // cm
    },
    stock: 10,
    category: 'Minicursos',
    features: [
      '4 aulas online ao vivo',
      'Kit completo incluído',
      'Arduino Uno + Sensores',
      'Módulo Bluetooth',
      'Grupo WhatsApp com professor',
      'Aulas gravadas para revisão',
      'Certificado de participação',
      'Para crianças de 9 a 14 anos',
    ],
    featuresEn: [
      '4 live online classes',
      'Complete kit included',
      'Arduino Uno + Sensors',
      'Bluetooth module',
      'WhatsApp group with professor',
      'Recorded classes for review',
      'Participation certificate',
      'For children aged 9 to 14',
    ],
  },
];

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo | null>(null);

  // Carregar carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('sth-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    localStorage.setItem('sth-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity: number, shippingCost: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, shippingCost }
            : item
        );
      }
      return [...prevCart, { product, quantity, shippingCost }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setShippingInfo(null);
  };

  const getCartSubtotal = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const getCartShippingTotal = () => {
    return cart.reduce((total, item) => total + item.shippingCost, 0);
  };

  const getCartTotal = () => {
    return getCartSubtotal() + getCartShippingTotal();
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        shippingInfo,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        setShippingInfo,
        getCartTotal,
        getCartSubtotal,
        getCartShippingTotal,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts deve ser usado dentro de ProductProvider');
  }
  return context;
}
