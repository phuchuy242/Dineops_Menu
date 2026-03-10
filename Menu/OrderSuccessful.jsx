import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function formatPrice(n) {
    return Number(n || 0).toLocaleString('vi-VN') + 'đ';
}

/**
 * OrderSuccessful – shown after the cart is submitted.
 * Reads last order details from localStorage('lastOrder').
 */
export default function OrderSuccessful() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const lastOrder = (() => {
        try {
            return JSON.parse(localStorage.getItem('lastOrder') || 'null');
        } catch {
            return null;
        }
    })();

    const MAX_VISIBLE = 3;
    const cartItems = lastOrder?.cart || [];
    const visibleItems = cartItems.slice(0, MAX_VISIBLE);
    const extraCount = cartItems.length - MAX_VISIBLE;

    return (
        <div className="rm-order-success-page">
            <div className="rm-os-card">
                <div className="rm-os-icon">✓</div>

                <h1 className="rm-os-title">{t('orderSuccess.title')}</h1>

                {lastOrder?.id && (
                    <p className="rm-os-order-num">
                        {t('orderSuccess.orderNumber')}: <strong>#{lastOrder.id}</strong>
                    </p>
                )}

                <p className="rm-os-thank">{t('orderSuccess.thankYou')}</p>

                {visibleItems.length > 0 && (
                    <ul className="rm-os-items">
                        {visibleItems.map((item, i) => (
                            <li key={i} className="rm-os-item">
                                <span>{item.quantity}× {item.name}</span>
                                <span>{formatPrice(item.subtotal ?? item.price)}</span>
                            </li>
                        ))}
                        {extraCount > 0 && (
                            <li className="rm-os-more">
                                {t('orderSuccess.moreItems', { count: extraCount })}
                            </li>
                        )}
                    </ul>
                )}

                {lastOrder?.total && (
                    <div className="rm-os-total">
                        {t('cart.total')}: <strong>{formatPrice(lastOrder.total)}</strong>
                    </div>
                )}

                <button className="rm-os-btn" onClick={() => navigate('/')}>
                    {t('orderSuccess.backHome')}
                </button>
            </div>
        </div>
    );
}
