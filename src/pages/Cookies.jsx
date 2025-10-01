import React from "react";
import "../styles/components/_cookies-page.scss";

const CookiesPage = () => {
  return (
    <div className="cookies-page container">
      <h1>Política de Cookies</h1>

      <section>
        <h2>¿Qué son las cookies?</h2>
        <p>
          El acceso a este Sitio Web puede implicar la utilización de cookies. Las cookies son pequeñas
          cantidades de información que se almacenan en el navegador utilizado por cada Usuario —en
          los distintos dispositivos que pueda utilizar para navegar— para que el servidor recuerde cierta
          información que posteriormente y únicamente el servidor que la implementó leerá. 
          Las cookies facilitan la navegación, la hacen más amigable, y no dañan el dispositivo de navegación.
        </p>
        <p>
          Las cookies son procedimientos automáticos de recogida de información relativa a las
          preferencias determinadas por el Usuario durante su visita al Sitio Web con el fin de
          reconocerlo como Usuario, personalizar su experiencia y el uso del Sitio Web, y pueden
          también, por ejemplo, ayudar a identificar y resolver errores.
        </p>
        <p>
          La información recabada puede incluir fecha y hora de visitas, páginas visionadas, tiempo
          de navegación y sitios visitados antes y después. Ninguna cookie permite contactar con el
          número de teléfono del Usuario o extraer información del disco duro.
        </p>
      </section>

      <section>
        <h2>Cookies propias</h2>
        <p>
          Son aquellas enviadas al dispositivo del Usuario y gestionadas exclusivamente por Tictrack
          para mejorar la experiencia en el Sitio Web. Permiten reconocer al Usuario como visitante
          recurrente y adaptar el contenido según sus preferencias.
        </p>
      </section>

      <section>
        <h2>Cookies de terceros</h2>
        <p>
          Son cookies gestionadas por entidades externas que proporcionan servicios a Tictrack, como
          estadísticas de accesos y análisis de la navegación. La información recopilada es anónima y
          se usa para mejorar el Sitio Web y su contenido.
        </p>
        <p>
          Ejemplo: Google Analytics - <a href="https://developers.google.com/analytics/" target="_blank" rel="noreferrer">https://developers.google.com/analytics/</a>
        </p>
      </section>

      <section>
        <h2>Cookies de redes sociales</h2>
        <p>
          Tictrack incorpora plugins de redes sociales, que pueden almacenar cookies en el navegador
          del Usuario. Cada red social es responsable de sus propias cookies y políticas de privacidad:
        </p>
        <ul>
          <li>Facebook: <a href="https://www.facebook.com/policies/cookies/" target="_blank" rel="noreferrer">https://www.facebook.com/policies/cookies/</a></li>
          <li>Twitter: <a href="https://twitter.com/es/privacy" target="_blank" rel="noreferrer">https://twitter.com/es/privacy</a></li>
          <li>Instagram: <a href="https://help.instagram.com/1896641480634370?ref=ig" target="_blank" rel="noreferrer">https://help.instagram.com/1896641480634370?ref=ig</a></li>
          <li>YouTube: <a href="https://policies.google.com/privacy?hl=es-419&gl=mx" target="_blank" rel="noreferrer">https://policies.google.com/privacy?hl=es-419&gl=mx</a></li>
          <li>Pinterest: <a href="https://policy.pinterest.com/es/privacy-policy" target="_blank" rel="noreferrer">https://policy.pinterest.com/es/privacy-policy</a></li>
          <li>LinkedIn: <a href="https://www.linkedin.com/legal/cookie-policy?trk=hp-cookies" target="_blank" rel="noreferrer">https://www.linkedin.com/legal/cookie-policy?trk=hp-cookies</a></li>
        </ul>
      </section>

      <section>
        <h2>Cómo gestionar las cookies</h2>
        <p>
          El Usuario puede deshabilitar, rechazar y eliminar las cookies mediante la configuración
          de su navegador (Chrome, Firefox, Safari, Explorer, etc.). Esto puede limitar la
          funcionalidad del Sitio Web.
        </p>
      </section>
    </div>
  );
};

export default CookiesPage;
