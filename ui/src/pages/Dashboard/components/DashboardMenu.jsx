import React from 'react';
import { Link } from 'react-router-dom';

export default function DashboardMenu() {
  return (
    <div className="hero-body">
      <div className="container has-text-centered">
        <div className="tabs is-centered is-boxed">
          <ul>
            <li className={window.location.pathname === '/dashboard/extract' ? 'is-active' : ''}>
              <Link to="/dashboard/extract">
                <span>Extract</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/dashboard/transfer' ? 'is-active' : ''}>
              <Link to="/dashboard/transfer">
                <span>Transfer</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/dashboard/deposit' ? 'is-active' : ''}>
              <Link to="/dashboard/deposit">
                <span>Deposit</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/dashboard/withdraw' ? 'is-active' : ''}>
              <Link to="/dashboard/withdraw">
                <span>Withdraw</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/dashboard/contacts' ? 'is-active' : ''}>
              <Link to="/dashboard/contacts">
                <span>Contacts</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}
