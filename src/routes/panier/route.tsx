import React from 'react';
import { useCart } from '~/contexts/CartContext';
import './panier.css'; // Assurez-vous d'importer le fichier CSS

const PanierPage: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const checkout = () => {
    // Ajoutez ici la logique de paiement réelle
    console.log('Paiement effectué avec succès');
    clearCart();
  };

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Panier</h1>
      </div>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Votre panier est vide.</p>
        </div>
      ) : (
        <div>
          <h2>Articles dans votre panier :</h2>
          <ul className="cart-items">
            {cart.map((course) => (
              <li className="cart-item" key={course.id}>
                <div>
                  <h3>{course.title}</h3>
                  <p>Prix : ${course.price}</p>
                </div>
                <button onClick={() => removeFromCart(course.id)}>Retirer du panier</button>
              </li>
            ))}
          </ul>
          <div className="cart-total">
            <h2>Total: ${cart.reduce((total, course) => total + course.price, 0).toFixed(2)}</h2>
            <button onClick={checkout}>Payer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanierPage;
