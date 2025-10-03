import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { X, Calendar, Euro, MapPin, Fuel, Receipt } from "lucide-react";
import { fetchUserTicketsByUserId } from "@/features/tickets/ticketsSlice";
import { LoadingCar } from "./common/LoadingCar";

export default function UserTicketsModal({ isOpen, onClose, user }) {
  const dispatch = useDispatch();
  const { userTickets } = useSelector((state) => state.tickets);

  React.useEffect(() => {
    if (isOpen && user) {
      dispatch(fetchUserTicketsByUserId({ userId: user.id }));
    }
  }, [isOpen, user, dispatch]);

  if (!isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  const getDomainIcon = (domain) => {
    switch (domain) {
      case 'combustible': return <Fuel size={16} />;
      case 'peaje': return <MapPin size={16} />;
      case 'ev': return <Receipt size={16} />;
      default: return <Receipt size={16} />;
    }
  };

  const getDomainColor = (domain) => {
    switch (domain) {
      case 'combustible': return '#ff6b35';
      case 'peaje': return '#45b7d1';
      case 'ev': return '#4ecdc4';
      default: return '#666';
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Tickets de {user?.driver}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {userTickets.loading ? (
            <div className="loading-state">
              <LoadingCar />
            </div>
          ) : userTickets.error ? (
            <div className="error-state">
              <p>Error: {userTickets.error}</p>
            </div>
          ) : userTickets.data?.items?.length > 0 ? (
            <div className="tickets-list">
              {userTickets.data.items.map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-header">
                    <div className="ticket-domain" style={{ color: getDomainColor(ticket.domain) }}>
                      {getDomainIcon(ticket.domain)}
                      <span>{ticket.domain}</span>
                    </div>
                    <div className="ticket-amount">
                      <Euro size={14} />
                      <span>{ticket.importe || ticket.total}€</span>
                    </div>
                  </div>
                  
                  <div className="ticket-details">
                    <div className="ticket-date">
                      <Calendar size={14} />
                      <span>{formatDate(ticket.fecha)}</span>
                    </div>
                    {ticket.empresaNombre && (
                      <div className="ticket-company">
                        <span>{ticket.empresaNombre}</span>
                      </div>
                    )}
                  </div>

                  {ticket.status && (
                    <div className="ticket-status">
                      <span className={`status-badge status-${ticket.status}`}>
                        {ticket.status}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No se encontraron tickets para este usuario</p>
            </div>
          )}
        </div>

        {userTickets.data && userTickets.data.total > 0 && (
          <div className="modal-footer">
            <p>Total: {userTickets.data.total} tickets encontrados</p>
          </div>
        )}
      </div>
    </div>
  );
}