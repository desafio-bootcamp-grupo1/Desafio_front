import React from "react";
import "../styles/components/_cookies-page.scss";

const PrivacyPolicyPage = () => {
  return (
    <div className="cookies-page container">
      <h1>Política de Privacidad</h1>

      <section>
        <h2>I. Política de Privacidad y Protección de Datos</h2>
        <p>
          Respetando lo establecido en la legislación vigente, <strong>Tictrack</strong> (en adelante, también Sitio Web) se compromete a adoptar las medidas técnicas y organizativas necesarias, según el nivel de seguridad adecuado al riesgo de los datos recogidos.
        </p>
        <h3>Leyes que incorpora esta política de privacidad</h3>
        <ul>
          <li>Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo (RGPD).</li>
          <li>Ley Orgánica 3/2018, de Protección de Datos Personales y garantía de los derechos digitales (LOPD-GDD).</li>
          <li>Real Decreto 1720/2007, Reglamento de desarrollo de la Ley Orgánica 15/1999 (RDLOPD).</li>
          <li>Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE).</li>
        </ul>

        <h3>Identidad del responsable del tratamiento</h3>
        <p>
          Responsable: <strong>TICTRACK S.L.</strong><br/>
          NIF/CIF: C37213675<br/>
          Registro Mercantil de Bilbao: Tomo 0, Página 9, Hoja 888<br/>
          Representante: María Virginia Guzmán<br/>
          Dirección: Urazurrutia Kalea, 3, Ibaiondo, 48003 Bilbao, Bizkaia<br/>
          Teléfono: 944152304<br/>
          Email: <a href="mailto:RGPD@tictrack.eus">RGPD@tictrack.eus</a>
        </p>

        <h3>Registro de Datos de Carácter Personal</h3>
        <p>
          Los datos recabados mediante los formularios del Sitio Web quedarán incorporados a nuestro fichero con el fin de facilitar, agilizar y cumplir los compromisos entre Tictrack y el Usuario. Se mantiene un registro de actividades de tratamiento según RGPD y LOPD-GDD.
        </p>

        <h3>Principios aplicables al tratamiento de los datos personales</h3>
        <ul>
          <li>Licitud, lealtad y transparencia</li>
          <li>Limitación de la finalidad</li>
          <li>Minimización de datos</li>
          <li>Exactitud</li>
          <li>Limitación del plazo de conservación</li>
          <li>Integridad y confidencialidad</li>
          <li>Responsabilidad proactiva</li>
        </ul>

        <h3>Categorías de datos personales</h3>
        <p>Únicamente se tratan datos identificativos. No se tratan categorías especiales según el artículo 9 del RGPD.</p>

        <h3>Base legal para el tratamiento de los datos personales</h3>
        <p>La base legal es el consentimiento del Usuario, que podrá retirarlo en cualquier momento con la misma facilidad con que lo otorgó.</p>

        <h3>Fines del tratamiento</h3>
        <p>
          Los datos se utilizan para gestionar relaciones, consultas, solicitudes y fines comerciales, operativos, estadísticos y de marketing, así como para mejorar la navegación del Sitio Web.
        </p>

        <h3>Períodos de retención</h3>
        <p>Los datos se conservarán durante 2 años o hasta que el Usuario solicite su supresión.</p>

        <h3>Destinatarios de los datos personales</h3>
        <p>Los datos se compartirán con <strong>WEBANALYTICS, S.L.</strong>. En caso de transferencias internacionales, se informará al Usuario.</p>

        <h3>Datos personales de menores</h3>
        <p>
          Solo mayores de 14 años pueden otorgar su consentimiento. Para menores de 14 años, se requiere autorización de padres o tutores.
        </p>

        <h3>Seguridad de los datos</h3>
        <p>
          Tictrack adopta medidas técnicas y organizativas para proteger los datos, incluyendo certificado SSL. En caso de violaciones de seguridad, se informará al Usuario según RGPD.
        </p>

        <h3>Derechos del Usuario</h3>
        <ul>
          <li>Acceso</li>
          <li>Rectificación</li>
          <li>Supresión (derecho al olvido)</li>
          <li>Limitación del tratamiento</li>
          <li>Portabilidad de los datos</li>
          <li>Oposición</li>
          <li>No ser objeto de decisiones automatizadas</li>
        </ul>
        <p>
          Para ejercer estos derechos, se puede enviar comunicación escrita a la dirección postal o email del responsable.
        </p>

        <h3>Enlaces a terceros</h3>
        <p>
          El Sitio Web puede incluir enlaces a terceros que tienen sus propias políticas de privacidad.
        </p>

        <h3>Reclamaciones</h3>
        <p>
          El Usuario puede presentar reclamaciones ante la autoridad de control correspondiente, en España, la <a href="https://www.aepd.es/">AEPD</a>.
        </p>
      </section>

      <section>
        <h2>II. Aceptación y cambios en esta política</h2>
        <p>
          El uso del Sitio Web implica la aceptación de esta Política de Privacidad. Tictrack puede modificar la política en cualquier momento; se recomienda consultar esta página periódicamente.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicyPage;
