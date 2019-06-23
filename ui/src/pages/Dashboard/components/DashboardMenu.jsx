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
                <span className="icon is-small"><i className="fas fa-file-invoice-dollar" aria-hidden="true" /></span>
                <span>Extract</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/dashboard/transfer' ? 'is-active' : ''}>
              <Link to="/dashboard/transfer">
                <span className="icon is-small"><i className="fas fa-exchange-alt" aria-hidden="true" /></span>
                <span>Transfer</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/dashboard/deposit' ? 'is-active' : ''}>
              <Link to="/dashboard/deposit">
                <span className="icon is-small"><i className="fas fa-sort-amount-up" aria-hidden="true" /></span>
                <span>Deposit</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/dashboard/withdraw' ? 'is-active' : ''}>
              <Link to="/dashboard/withdraw">
                <span className="icon is-small"><i className="fas fa-sort-amount-down" aria-hidden="true" /></span>

                <span>Withdraw</span>
              </Link>
            </li>
            <li className={window.location.pathname === '/dashboard/contacts' ? 'is-active' : ''}>
              <Link to="/dashboard/contacts">
                <span className="icon is-small"><i className="fas fa-user-friends" aria-hidden="true" /></span>

                <span>Contacts</span>
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}
