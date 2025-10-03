// components/driver/TicketsList.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserTickets, fetchTicketById } from "@/features/tickets/ticketsSlice";
import { Card, CardContent } from "../ui/Card";
import { Eye, Fuel, Zap, MapPin, Calendar, Euro, X, List, ChevronRight } from "lucide-react";

const TicketsList = () => {
  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.tickets.list);
  const currentTicket = useSelector((state) => state.tickets.current);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [view, setView] = useState('list');
  const [filters, setFilters] = useState({
    domain: '',
    page: 1,
    limit: 10
  });

  // Cargar tickets para la vista previa
  useEffect(() => {
    dispatch(fetchUserTickets({ page: 1, limit: 5 })); // Solo cargar 5 para la vista previa
  }, [dispatch]);

  // Cargar tickets completos cuando se abre el modal
  useEffect(() => {
    if (isModalOpen) {
      dispatch(fetchUserTickets(filters));
    }
  }, [dispatch, isModalOpen, filters]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setView('list');
    setSelectedTicket(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setView('list');
    setSelectedTicket(null);
  };

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
    setView('detail');
    dispatch(fetchTicketById(ticket.id));
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedTicket(null);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1
    }));
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({
      ...prev,
      page: newPage
    }));
  };

  const getDomainIcon = (domain) => {
    switch (domain) {
      case 'combustible': return <Fuel size={16} />;
      case 'ev': return <Zap size={16} />;
      case 'peaje': return <MapPin size={16} />;
      default: return <Calendar size={16} />;
    }
  };

  const getDomainColor = (domain) => {
    switch (domain) {
      case 'combustible': return '#ff6b35';
      case 'ev': return '#4ecdc4';
      case 'peaje': return '#45b7d1';
      default: return '#96ceb4';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getAmount = (ticket) => {
    return ticket.domain === 'peaje' ? ticket.importe : ticket.total;
  };

  // VISTA PREVIA (lo que se muestra en la página del driver)
  const renderTicketsPreview = () => (
    <Card className="card" >
      <CardContent>
        <div 
          onClick={handleOpenModal}
          style={{ 
            cursor: 'pointer',
          }}
        >
          {/* Header de la vista previa */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '1rem'
          }}>
            <h3 style={{ margin: '20px 0px 0px', color: 'var(--coral)' }}>Mis Tickets Recientes</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666' }}>
              <span style={{ fontSize: '0.875rem' }}>Ver todos</span>
              <ChevronRight size={16} />
            </div>
          </div>

          {/* Lista de tickets (vista previa) */}
          {tickets.loading ? (
            <div style={{ padding: '1rem', textAlign: 'center' }}>
              <p>Cargando tickets...</p>
            </div>
          ) : tickets.error ? (
            <div style={{ padding: '1rem', textAlign: 'center' }}>
              <p>Error al cargar tickets</p>
            </div>
          ) : tickets.data?.items?.length === 0 ? (
            <div style={{ padding: '1rem', textAlign: 'center' }}>
              <p>No hay tickets recientes</p>
            </div>
          ) : (
            <div className="tickets-preview">
              {tickets.data?.items?.slice(0, 5).map((ticket) => (
                <div 
                  key={ticket.id}
                  className="ticket-preview-item"
                  style={{
                    borderBottom: '1px solid #f0f0f0',
                    padding: '0.75rem 0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ color: getDomainColor(ticket.domain) }}>
                      {getDomainIcon(ticket.domain)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500', textTransform: 'capitalize', fontSize: '0.9rem' }}>
                        {ticket.domain}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>
                        {formatDate(ticket.fecha)}
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--coral)', fontSize: '0.9rem' }}>
                      €{getAmount(ticket)?.toFixed(2) || '0.00'}
                    </div>
                    {ticket.empresaNombre && (
                      <div style={{ fontSize: '0.75rem', color: '#666' }}>
                        {ticket.empresaNombre}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Footer con contador */}
          {tickets.data && tickets.data.total > 5 && (
            <div style={{ 
              marginTop: '1rem',
              paddingTop: '1rem',
              borderTop: '1px solid #f0f0f0',
              textAlign: 'center'
            }}>
              <span style={{ fontSize: '0.875rem', color: '#666' }}>
                Y {tickets.data.total - 5} tickets más...
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );


  const renderTicketList = () => (
    <>
      {/* Header del Modal */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <h2 style={{ margin: '20px 0px 0px', color: 'var(--coral)' }}>Mis Tickets</h2>
        <button 
          onClick={handleCloseModal}
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            color: '#666',
            padding: '0.25rem'
          }}
        >
          <X size={20} />
        </button>
      </div>

      <Card className="card" style={{ marginBottom: '1.5rem' }}>
        <CardContent>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            alignItems: 'center', 
            flexWrap: 'wrap',
            padding: '20px 0px 0px'
          }}>
            <label>
              <span style={{ marginRight: '0.5rem', fontWeight: '500' }}>Tipo:</span>
              <select 
                value={filters.domain}
                onChange={(e) => handleFilterChange('domain', e.target.value)}
                style={{ 
                  padding: '0.5rem', 
                  borderRadius: '4px', 
                  border: '1px solid #ddd',
                  backgroundColor: 'white'
                }}
              >
                <option value="">Todos</option>
                <option value="combustible">Combustible</option>
                <option value="ev">Eléctrico</option>
                <option value="peaje">Peaje</option>
              </select>
            </label>
            
            <label>
              <span style={{ marginRight: '0.5rem', fontWeight: '500' }}>Mostrar:</span>
              <select 
                value={filters.limit}
                onChange={(e) => handleFilterChange('limit', parseInt(e.target.value))}
                style={{ 
                  padding: '0.5rem', 
                  borderRadius: '4px', 
                  border: '1px solid #ddd',
                  backgroundColor: 'white'
                }}
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </label>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Tickets */}
      <Card className="card">
        <CardContent style={{ padding: 0 }}>
          {tickets.loading ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p>Cargando tickets...</p>
            </div>
          ) : tickets.error ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p>Error al cargar tickets: {tickets.error}</p>
              <button 
                className="btn btn--primary"
                onClick={() => dispatch(fetchUserTickets(filters))}
                style={{ marginTop: '1rem' }}
              >
                Reintentar
              </button>
            </div>
          ) : tickets.data?.items?.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <p>No se encontraron tickets</p>
            </div>
          ) : (
            <>
              <div className="tickets-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {tickets.data?.items?.map((ticket) => (
                  <div 
                    key={ticket.id}
                    className="ticket-item"
                    onClick={() => handleTicketClick(ticket)}
                    style={{
                      borderBottom: '1px solid #e0e0e0',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      backgroundColor: 'white'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ color: getDomainColor(ticket.domain) }}>
                          {getDomainIcon(ticket.domain)}
                        </div>
                        <div>
                          <div style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
                            {ticket.domain}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#666' }}>
                            {formatDate(ticket.fecha)}
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontWeight: 'bold', color: 'var(--coral)' }}>
                            €{getAmount(ticket)?.toFixed(2) || '0.00'}
                          </div>
                          {ticket.empresaNombre && (
                            <div style={{ fontSize: '0.875rem', color: '#666' }}>
                              {ticket.empresaNombre}
                            </div>
                          )}
                        </div>
                        <Eye size={16} color="#666" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Paginación */}
              {tickets.data && tickets.data.total > filters.limit && (
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '1rem',
                  borderTop: '1px solid #e0e0e0',
                  backgroundColor: '#f8f9fa'
                }}>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    Mostrando {((filters.page - 1) * filters.limit) + 1} - {Math.min(filters.page * filters.limit, tickets.data.total)} de {tickets.data.total} tickets
                  </div>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn--outline"
                      disabled={filters.page === 1}
                      onClick={() => handlePageChange(filters.page - 1)}
                      style={{backgroundColor:'var(--coral)'}}
                    >
                      Anterior
                    </button>
                    <button
                      className="btn btn--outline"
                      disabled={filters.page * filters.limit >= tickets.data.total}
                      onClick={() => handlePageChange(filters.page + 1)}
                      style={{backgroundColor:'var(--coral)'}}
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );

  // Renderizar detalle del ticket (PARA EL MODAL)
  const renderTicketDetail = () => (
    <>
      {/* Header del Detalle */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button 
            onClick={handleBackToList}
            style={{ 
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              color: '#666',
              padding: '0.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}
          >
            «
            <span>Volver</span>
          </button>
        </div>
        <button 
          onClick={handleCloseModal}
          style={{ 
            background: 'none', 
            border: 'none', 
            fontSize: '1.5rem', 
            cursor: 'pointer',
            color: '#666',
            padding: '0.25rem'
          }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Contenido del Detalle */}
      <Card className="card">
        <CardContent>
          {currentTicket.loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Cargando detalles del ticket...</p>
            </div>
          ) : currentTicket.error ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Error al cargar detalles: {currentTicket.error}</p>
              <button 
                className="btn btn--primary"
                onClick={() => dispatch(fetchTicketById(selectedTicket.id))}
                style={{ marginTop: '1rem' }}
              >
                Reintentar
              </button>
            </div>
          ) : currentTicket.data ? (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ color: getDomainColor(currentTicket.data.domain) }}>
                  {getDomainIcon(currentTicket.data.domain)}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', textTransform: 'capitalize', fontSize: '1.25rem' }}>
                    {currentTicket.data.domain}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    {formatDate(currentTicket.data.fecha)}
                  </div>
                </div>
              </div>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                padding: '1rem',
                backgroundColor: '#f8f9fa',
                borderRadius: '8px'
              }}>
                <Euro size={20} />
                <span style={{ fontWeight: 'bold', color: 'var(--coral)', fontSize: '1.5rem' }}>
                  €{getAmount(currentTicket.data)?.toFixed(2) || '0.00'}
                </span>
              </div>

              <div style={{ display: 'grid', gap: '1rem' }}>
                {currentTicket.data.empresaNombre && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong>Empresa:</strong>
                    <span>{currentTicket.data.empresaNombre}</span>
                  </div>
                )}

                {currentTicket.data.autopista && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong>Autopista:</strong>
                    <span>{currentTicket.data.autopista}</span>
                  </div>
                )}

                {currentTicket.data.provincia && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong>Provincia:</strong>
                    <span>{currentTicket.data.provincia}</span>
                  </div>
                )}

                {currentTicket.data.formaPago && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong>Forma de pago:</strong>
                    <span>{currentTicket.data.formaPago}</span>
                  </div>
                )}

                {currentTicket.data.referencia && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong>Referencia:</strong>
                    <span>{currentTicket.data.referencia}</span>
                  </div>
                )}

                {currentTicket.data.status && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid #f0f0f0' }}>
                    <strong>Estado:</strong>
                    <span style={{ 
                      color: currentTicket.data.status === 'approved' ? 'green' : 
                            currentTicket.data.status === 'pending' ? 'orange' : 'red'
                    }}>
                      {currentTicket.data.status}
                    </span>
                  </div>
                )}
              </div>

              {currentTicket.data.previewUrl && (
                <div>
                  <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Imagen del ticket:</strong>
                  <img 
                    src={currentTicket.data.previewUrl} 
                    alt="Ticket" 
                    style={{ 
                      maxWidth: '100%', 
                      borderRadius: '8px',
                      border: '1px solid #e0e0e0'
                    }}
                  />
                </div>
              )}
            </div>
          ) : null}
        </CardContent>
      </Card>
    </>
  );

  // El componente ahora renderiza la VISTA PREVIA + el MODAL
  return (
    <div className="tickets-section">
      {/* VISTA PREVIA - Se muestra en la página del driver */}
      {renderTicketsPreview()}

      {/* MODAL - Se abre al hacer click en la vista previa */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <Card className="card" style={{ 
            maxWidth: '600px', 
            width: '100%', 
            maxHeight: '90vh',
            overflow: 'hidden'
          }}>
            <CardContent style={{ 
              padding: '1.5rem',
              maxHeight: 'calc(90vh - 3rem)',
              overflow: 'auto'
            }}>
              {view === 'list' ? renderTicketList() : renderTicketDetail()}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TicketsList;