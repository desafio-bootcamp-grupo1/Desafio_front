import React, { useState, useRef } from 'react';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import TicketValidator from '../components/utils/ticketValidator.js';
import Camera from './camera/Camera.jsx';
import { createGasolinerasTicket } from '../features/tickets/ticketsSlice';

const ScanTicketModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const { creating, error: ticketError } = useSelector(state => state.tickets);
  
  const [previewUrl, setPreviewUrl] = useState('');
  const [view, setView] = useState('menu');
  const fileInputRef = useRef(null);
  const [validando, setValidando] = useState(false);
  const [esTicket, setEsTicket] = useState(null);
  const [error, setError] = useState('');
  const [resultadoValidacion, setResultadoValidacion] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const validarImagen = async (imageSrc, file = null) => {
    if (validando) return;

    setValidando(true);
    setError('');

    try {
      const resultado = await TicketValidator.validarTicket(imageSrc);
      
      setResultadoValidacion(resultado);
      setEsTicket(resultado.esTicket);

      if (resultado.esTicket) {
        toast.success('✅ ¡Es un ticket válido!');
        if (file) {
          setImageFile(file);
        }
      } else {
        toast.error('❌ No parece un ticket válido');
        setTimeout(() => {
          clearImage();
        }, 2000);
      }
    } catch (error) {
      console.error('ERROR validando ticket:', error);
      toast.error('Error procesando la imagen');
      setError(error.message);
      setEsTicket(false);
      setTimeout(() => {
        clearImage();
      }, 2000);
    } finally {
      setValidando(false);
    }
  };

  const procesarTicket = async () => {
    if (!imageFile || !resultadoValidacion) {
      toast.error('No hay imagen para procesar');
      return;
    }

    try {
      const result = await dispatch(createGasolinerasTicket({
        file: imageFile,
        fecha: new Date()
      })).unwrap();

      toast.success('✅ Ticket guardado correctamente en el servidor');
      onClose();
    } catch (error) {
      console.error('Error guardando ticket:', error);
      toast.error('❌ Error guardando el ticket en el servidor');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target.result;
        setPreviewUrl(imageUrl);
        setEsTicket(null);
        setResultadoValidacion(null);
        setView('preview');
        setTimeout(() => validarImagen(imageUrl, file), 500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoTaken = (imageSrc) => {
    const file = dataURLtoFile(imageSrc, 'ticket-photo.jpg');
    setImageFile(file);
    
    setPreviewUrl(imageSrc);
    setEsTicket(null);
    setResultadoValidacion(null);
    setView('preview');
    setTimeout(() => validarImagen(imageSrc, file), 500);
  };

  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
  };

  const clearImage = () => {
    setPreviewUrl('');
    setEsTicket(null);
    setError('');
    setResultadoValidacion(null);
    setImageFile(null);
    setView('menu');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const openCamera = () => {
    setView('camera');
  };

  const backToMenu = () => {
    setView('menu');
    clearImage();
  };

  const reintentarValidacion = async () => {
    if (!previewUrl || !imageFile) {
      toast.error('Por favor, selecciona una imagen primero');
      return;
    }
    await validarImagen(previewUrl, imageFile);
  };

  const renderPreviewView = () => {
    if (esTicket === false && !validando) {
      return null;
    }

    return (
      <div className="preview-section">
        <div className="preview-header">
          <button onClick={backToMenu} className="back-btn">🡸 Volver</button>
          <h3>Vista previa del ticket</h3>
        </div>
        
        <div className="preview-image-container">
          <img
            src={previewUrl}
            alt="Vista previa del ticket"
            className="preview-ticket"
            style={{
              borderColor:
                validando ? '#007bff' :
                esTicket === true ? '#28a745' :
                esTicket === false ? '#dc3545' : '#ccc'
            }}
          />

          {validando && (
            <div className="validating-overlay">
              <div className="validating-message">
                <div className="loader"></div>
                <p>Validando imagen...</p>
              </div>
            </div>
          )}
        </div>

        {!validando && esTicket === true && resultadoValidacion && (
          <>
            <div className="preview-actions escaner-options" style={{
            display: 'flex', justifyContent: 'center', gap: '10px', flexDirection: 'row'
            }}>
              <button
                onClick={procesarTicket}
                disabled={creating || validando}
                className="btn-primary "
                style={{ opacity: (creating || validando) ? 0.6 : 1 }}
              >
                {creating ? '⏳ Enviando al servidor...' : '💾 Guardar Ticket'}
              </button>
              
              <button
                onClick={clearImage}
                disabled={creating || validando}
                className="btn-secondary"
              >
                🔄 Tomar otra foto
              </button>
            </div>
          </>
        )}

        {ticketError && (
          <div className="error-section">
            <p className="error-message">Error del servidor: {ticketError}</p>
            <button 
              onClick={procesarTicket} 
              className="btn-secondary"
              disabled={creating}
            >
              🔄 Reintentar envío
            </button>
          </div>
        )}

        {error && (
          <div className="error-section">
            <p className="error-message">{error}</p>
            <button 
              onClick={reintentarValidacion} 
              className="btn-secondary"
              disabled={validando}
            >
              🔄 Reintentar validación
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderMenuView = () => (
    <div className='escaner-options'>
      <button onClick={triggerFileInput} className="option-btn primary">
        📁 Seleccionar Imagen
      </button>
      <button onClick={openCamera} className="option-btn primary">
        Tomar Foto
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );

  const renderCameraView = () => (
    <div className="camera-modal-view">
      <div className="camera-modal-header">
        <button onClick={backToMenu} className="back-btn">🡸 Volver</button>
        <h3>Tomar Foto del Ticket</h3>
      </div>
      <div className="camera-modal-container">
        <Camera 
          onPhotoTaken={handlePhotoTaken}
          onClose={backToMenu}
          embedded={true}
        />
      </div>
    </div>
  );

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-camera animate-in scan-ticket-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>✖</button>
        
        <div className='escaner-content'>
          {view === 'menu' && (
            <>
              <div className='escaner-header'>
                <h2>Escanea tu ticket</h2>
                <p>Sube una imagen o toma una foto de tu ticket de combustible</p>
              </div>
              {renderMenuView()}
            </>
          )}
          
          {view === 'camera' && renderCameraView()}
          {view === 'preview' && renderPreviewView()}
        </div>
      </div>
    </div>
  );
};

export default ScanTicketModal;