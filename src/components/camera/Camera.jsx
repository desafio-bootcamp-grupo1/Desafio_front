import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'react-hot-toast';
import TicketValidator from '../utils/ticketValidator';
import ReverseIcon from '../../svg/ReverseIcon';
import Button from '../ui/Button';

function Camera({ onTicketProcessed, onClose, embedded = false }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [cameraFacingMode, setCameraFacingMode] = useState('environment');
  const [validando, setValidando] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const [mensajeProgreso, setMensajeProgreso] = useState('');
  const [resultadoValidacion, setResultadoValidacion] = useState(null);

  const webcamRef = useRef(null);

  useEffect(() => {
    const getPermissions = async () => {
      console.log('🎥 Solicitando permisos de cámara...');
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: cameraFacingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });
        setHasPermission(true);
        console.log('✅ Permisos concedidos, cámara lista');
        return () => stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error('❌ Error accediendo a la cámara:', err);
        toast.error('No se pudo acceder a la cámara');
        setHasPermission(false);
      }
    };
    getPermissions();
  }, [cameraFacingMode]);

  const validarImagen = async (imageSrc) => {
    if (validando) return;
    console.log('🔍 Iniciando validación de imagen...');
    setValidando(true);
    setProgreso(0);
    setMensajeProgreso('🔍 Iniciando análisis...');
    try {
      const resultado = await TicketValidator.validarTicket(
        imageSrc,
        (p, m) => {
          console.log(`📊 Progreso OCR: ${p}% - ${m}`);
          setProgreso(p);
          setMensajeProgreso(m);
        }
      );
      console.log('📄 Resultado validación:', resultado);
      if (resultado.esTicket) {
        toast.success('✅ Ticket válido detectado!');
        setCapturedImage(imageSrc);
        setResultadoValidacion(resultado);
      } else {
        toast.error('❌ No se reconoce como ticket');
        setCapturedImage(null);
        setResultadoValidacion(null);
      }
    } catch (error) {
      console.error('💥 Error procesando la imagen:', error);
      toast.error('Error procesando la imagen');
      setCapturedImage(null);
      setResultadoValidacion(null);
    } finally {
      console.log('🏁 Validación finalizada');
      setValidando(false);
    }
  };

  const capturePhoto = () => {
    if (!webcamRef.current) {
      toast.error('Cámara no disponible');
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot({ width: 1920, height: 1080, quality: 1.0 });
    console.log('📸 CAPTURANDO FOTO EN ALTA CALIDAD...');
    if (imageSrc) {
      setCapturedImage(imageSrc);
      setTimeout(() => validarImagen(imageSrc), 800);
    } else {
      toast.error('Error al capturar la foto');
    }
  };

  const toggleCamera = () => {
    console.log(`🔄 Cambiando cámara: ${cameraFacingMode} → ${cameraFacingMode === 'user' ? 'environment' : 'user'}`);
    setCameraFacingMode(prev => (prev === 'user' ? 'environment' : 'user'));
  };

  const procesarTicket = () => {
    if (!capturedImage || !resultadoValidacion) return;
    console.log('💾 Procesando y guardando ticket...');
    const existing = JSON.parse(localStorage.getItem('ticketsProcesados') || '[]');
    const ticketData = {
      imageSrc: capturedImage,
      text: resultadoValidacion.textoExtraido,
      timestamp: new Date().toISOString(),
      cameraMode: cameraFacingMode,
      esTicket: resultadoValidacion.esTicket,
      patronesEncontrados: resultadoValidacion.coincidencias
    };
    localStorage.setItem('ticketsProcesados', JSON.stringify([ticketData, ...existing]));
    toast.success('✅ Ticket procesado correctamente');
    
    if (onTicketProcessed) {
      onTicketProcessed();
    } else {
      setCapturedImage(null);
      setResultadoValidacion(null);
    }
  };

  const descartarTicket = () => {
    console.log('🗑️ Descartando ticket, volviendo a cámara...');
    setCapturedImage(null);
    setResultadoValidacion(null);
  };

  if (!hasPermission) {
    return (
      <div className="fullscreenContainer">
        <p className="message">Esperando permiso para acceder a la cámara...</p>
        {embedded && (
          <button onClick={onClose} className="option-btn secondary">
            Cancelar
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="fullscreenContainer">
      {capturedImage && resultadoValidacion?.esTicket ? (
        <div className="previewContainer">
          <img src={capturedImage} alt="Ticket detectado" className="capturedPhoto" />
          <div className="actionButtons">
            <Button variant="primary" size="md" onClick={procesarTicket}>✅ Procesar Ticket</Button>
            <Button variant="light" size="md" onClick={descartarTicket}>❌ Descartar</Button>
            {embedded && (
              <Button variant="light" size="md" onClick={onClose}>Cancelar</Button>
            )}
          </div>
        </div>
      ) : (
        <>
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            screenshotQuality={1}
            mirrored={cameraFacingMode === 'user'}
            forceScreenshotSourceSize
            videoConstraints={{ facingMode: cameraFacingMode, width: { ideal: 1920 }, height: { ideal: 1080 } }}
            className="webcam"
          />
          <div className="overlay">
            <div className="bottomControls">
              <Button variant="primary" size="lg" onClick={capturePhoto} disabled={validando}>📸 Tomar Foto</Button>
              <Button variant="light" size="lg" onClick={toggleCamera}><ReverseIcon /></Button>

            </div>
          </div>
          {validando && (
            <div className="modalProgress">
              <div className="loader"></div>
              <h3>Escaneando Ticket...</h3>
              <p>{mensajeProgreso}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Camera;