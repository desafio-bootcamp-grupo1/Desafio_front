class TicketValidator {
  static patronesTicket = [
    /REPSOL/gi, /CEPSA/gi, /SHELL/gi, /BP/gi, /GALP/gi,
    /CARREFOUR/gi, /ALCAMPO/gi, /EROSKI/gi,
    /FACTURA/gi, /TICKET/gi, /RECIBO/gi, /VENTA/gi,
    /GASOLINA/gi, /GASOLEO/gi, /DIESEL/gi, /SP95/gi, /SP98/gi,
    /LITROS?/gi, /LTS?/gi,
    /TOTAL/gi, /SUBTOTAL/gi, /IVA/gi, /IMPORTE/gi, /PRECIO/gi,
    /EUROS?/gi,
    /FECHA/gi, /HORA/gi,
    /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}/gi,
    /\d{1,2}[:\.]\d{2}/gi,
    /NUM/gi, /REF/gi, /COD/gi
  ];

  static async validarTicket(imageSrc = null) {
    try {
      const texto = await this.extraerTextoOCR(imageSrc);
      const resultado = this.analizarTexto(texto);
      return {
        ...resultado,
        imageSrc,
        timestamp: new Date().toISOString(),
        textoExtraido: texto
      };

    } catch (error) {
      console.error('error: ', error);
      throw error;
    }
  }

  static async extraerTextoOCR(imageSrc) {
    const Tesseract = (await import('tesseract.js')).default;

    try {
      const { data } = await Tesseract.recognize(imageSrc, 'spa+eng', {
        tessedit_pageseg_mode: 6,
        tessedit_ocr_engine_mode: 1,
        tessedit_char_whitelist: '',
      });

      const textoLimpio = this.limpiarTexto(data.text);
      return textoLimpio;

    } catch (error) {
      console.error('❌ ERROR EN OCR:', error);
      return '';
    }
  }

  static analizarTexto(texto) {

    if (!texto || texto.trim().length < 2) {
      console.warn('⚠️ TEXTO MUY CORTO O VACÍO - Posible fallo OCR');
      return this.crearResultado(false, 0, 0, texto);
    }
    const textoUpper = texto.toUpperCase();
    let coincidencias = 0;
    const patronesEncontrados = [];
    this.patronesTicket.forEach(patron => {
      try {
        const matches = textoUpper.match(patron);
        if (matches && matches.length > 0) {
          coincidencias++;
          patronesEncontrados.push({
            patron: patron.toString(),
            coincidencias: matches.length,
            ejemplos: matches.slice(0, 3)
          });
        }
      } catch (e) {
        console.warn(`⚠️ ERROR CON PATRÓN:`, e);
      }
    });

    const esTicket = coincidencias >= 1;

    return {
      esTicket,
      coincidencias,
      totalPatrones: this.patronesTicket.length,
      patronesEncontrados,
      textoAnalizado: texto
    };
  }

  static crearResultado(esTicket, coincidencias, texto) {
    return {
      esTicket,
      coincidencias,
      totalPatrones: this.patronesTicket.length,
      patronesEncontrados: [],
      textoAnalizado: texto
    };
  }

  static limpiarTexto(texto) {
    return texto
      .trim()
      .replace(/\n\s*\n/g, '\n')
      .replace(/[^\S\n]+/g, ' ')
      .replace(/^\s+|\s+$/g, '');
  }
}

export default TicketValidator;