import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import TicketValidator from '../components/utils/ticketValidator.js';
import Header from '../components/header/Header';

const EscanerPage = () => {
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState('');
  const fileInputRef = useRef(null);
  const [etapa, setEtapa] = useState('');
  const [progreso, setProgreso] = useState(0);
  const [esTicket, setEsTicket] = useState(null);
  const [error, setError] = useState('');
  const [validando, setValidando] = useState(false);
  const [mensajeProgreso, setMensajeProgreso] = useState('');
  const [resultadoValidacion, setResultadoValidacion] = useState(null);

  const validarImagen = async (imageSrc) => {
    if (validando) return;

    setValidando(true);
    setProgreso(0);
    setMensajeProgreso('🔍 Iniciando análisis...');
    setError('');

    try {
      const resultado = await TicketValidator.validarTicket(imageSrc);

      if (resultado.esTicket) {
        toast.success('✅ ¡Es un ticket!');
        setEsTicket(true);
        setResultadoValidacion(resultado);
      } else {
        toast.error('❌ No parece un ticket');
        setEsTicket(false);
        setResultadoValidacion(resultado);
        setTimeout(() => clearImage(), 2000);
      }

      setEtapa('completado');
      setProgreso(100);
    } catch (error) {
      console.error('ERROR validando ticket:', error);
      toast.error('Error procesando la imagen');
      setError(error.message);
      setEtapa('error');
    } finally {
      setValidando(false);
    }
  };

  const procesarTicket = async () => {
    if (!resultadoValidacion) return;

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success('✅ Ticket añadido correctamente');

      const existing = JSON.parse(localStorage.getItem('ticketsProcesados') || '[]');
      const ticketData = {
        imageSrc: previewUrl,
        text: resultadoValidacion.textoExtraido,
        timestamp: new Date().toISOString(),
        esTicket: resultadoValidacion.esTicket,
      };

      localStorage.setItem('ticketsProcesados', JSON.stringify([ticketData, ...existing]));
      clearImage();
    } catch (error) {
      toast.error('❌ Error procesando ticket');
      console.error('Error:', error);
    } finally {
      setValidando(false);
    }
  };

  useEffect(() => {
    const savedPreview = localStorage.getItem('ticketPreviewUrl');
    if (savedPreview) {
      setPreviewUrl(savedPreview);
      validarImagen(savedPreview);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreviewUrl(imageUrl);
        localStorage.setItem('ticketPreviewUrl', imageUrl);
        setEsTicket(null);
        setResultadoValidacion(null);
        setEtapa('');
        setTimeout(() => validarImagen(imageUrl), 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setPreviewUrl('');
    setEsTicket(null);
    setError('');
    setEtapa('');
    setProgreso(0);
    setResultadoValidacion(null);
    localStorage.removeItem('ticketPreviewUrl');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const reintentarValidacion = async () => {
    if (!previewUrl) {
      toast.error('Por favor, selecciona una imagen primero');
      return;
    }
    await validarImagen(previewUrl);
  };

  const renderBotonesAdicionales = () => {
    if (!esTicket || !resultadoValidacion) return null;

    return (
      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '10px' }}>
          <button 
            onClick={procesarTicket}
            disabled={validando}
            style={{ opacity: validando ? 0.6 : 1 }}
          >
            {validando ? '⏳ Añadiendo ticket...' : '📡 Añadir ticket'}
          </button>
          <button onClick={clearImage}>Descartar imagen</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header
        onLogout={() => {
          localStorage.removeItem("userType");
          localStorage.removeItem("userEmail");
          navigate("/login");
        }}
      />

      <div className='escaner-page'>
        <div className='escaner-header'>
          <h1>Escanea tu ticket</h1>
          <p>Utiliza la cámara para escanear automáticamente tickets de gasolina y registrar el gasto en tu historial</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          style={{ display: 'none' }}
        />

        {previewUrl ? (
          <div style={{ textAlign: 'center' }}>
            <h3>Vista previa:</h3>
            <img
              src={previewUrl}
              alt="Vista previa del ticket"
              style={{
                maxWidth: '300px',
                maxHeight: '400px',
                border: `2px solid ${
                  validando ? '#007bff' : 
                  esTicket === true ? '#28a745' : 
                  esTicket === false ? '#dc3545' : '#ccc'
                }`,
                borderRadius: '10px'
              }}
            />

            {validando && (
              <div style={{ marginTop: '15px', color: '#007bff', fontWeight: 'bold' }}>
                Validando imagen...
              </div>
            )}

            {renderBotonesAdicionales()}
          </div>
        ) : (
          <div className='escaner-options'>
            <button onClick={triggerFileInput}>Seleccionar Imagen</button>
            <button onClick={() => navigate('/app/camera')}>Tomar Foto</button>
          </div>
        )}

        {error && (
          <div style={{
            marginTop: '20px',
            padding: '15px',
            background: '#ffebee',
            color: '#c62828',
            borderRadius: '5px',
            textAlign: 'center'
          }}>
            <p>{error}</p>
            <button 
              onClick={reintentarValidacion} 
              style={{ marginTop: '10px', padding: '10px 20px' }}
            >
              Reintentar
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default EscanerPage;
