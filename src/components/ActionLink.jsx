import React from 'react';

export function ActionLink({ children, href = '#contact', solid = false }) {
  return <a className={`action ${solid ? 'action--solid' : ''}`} href={href}><span>{children}</span><i className="ri-arrow-right-line" /></a>;
}
