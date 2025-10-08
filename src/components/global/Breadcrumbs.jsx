import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Simple breadcrumb navigation
 * @param {Array<{label: string, to?: string}>} items
 */
const Breadcrumbs = ({ items = [] }) => {
  if (!items.length) return null;
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <span key={idx} className={isLast ? 'breadcrumb-current' : 'breadcrumb-item'}>
            {item.to && !isLast ? (
              <Link to={item.to}>{item.label}</Link>
            ) : (
              <span aria-current={isLast ? 'page' : undefined}>{item.label}</span>
            )}
            {!isLast && <span className="breadcrumb-sep" aria-hidden>›</span>}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;

