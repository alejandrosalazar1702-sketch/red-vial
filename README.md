# Red vial: guía para publicar la app

Esta carpeta es una página web completa. No necesita servidor propio: se publica gratis en GitHub Pages y queda con un enlace que cualquiera abre desde el celular.

## Qué contiene
- `index.html`: la app (mapa, mediciones y simulador).
- `model.js`: las regresiones lineal y cuadrática.
- `sw.js` y `manifest.webmanifest`: permiten "Agregar a la pantalla de inicio" y abrirla sin conexión.
- `icons/`: íconos de la app.
- `vendor/`: Leaflet (mapa) y el generador de código QR. No hay que descargar nada más.

## Publicarla en GitHub Pages (unos 10 minutos)
1. Creen una cuenta en github.com (si no tienen) y toquen **New repository**. Nombre sugerido: `red-vial`. Déjenlo **Public**.
2. En el repositorio nuevo toquen **uploading an existing file** y arrastren **el contenido** de esta carpeta (no la carpeta misma), incluyendo `vendor` e `icons`. Toquen **Commit changes**.
3. Vayan a **Settings → Pages**. En *Branch* elijan `main` y la carpeta `/ (root)`, y guarden.
4. Esperen uno o dos minutos. GitHub muestra el enlace, con esta forma: `https://SU-USUARIO.github.io/red-vial/`.
5. Abran ese enlace, toquen el botón **Código QR** de la app y proyecten el código en la última diapositiva.

Para cambiar algo después, suban el archivo nuevo al mismo repositorio y el enlace se actualiza solo.

## Instalarla como app en el celular
- Android (Chrome): menú ⋮ → **Instalar aplicación** o **Agregar a la pantalla de inicio**.
- iPhone (Safari): botón Compartir → **Agregar a inicio**.

## Cosas que conviene saber
- **Abrirla desde el enlace publicado.** Si abren `index.html` directamente desde la carpeta, el mapa puede no cargar, porque OpenStreetMap exige que la página venga de una dirección web.
- **Necesita internet para el mapa y las rutas.** El mapa usa OpenStreetMap y el trazado de rutas usa el servicio público de OSRM, pensado para uso ligero. Para una clase o una feria alcanza, pero no tiene garantía de disponibilidad. Si la ruta no se traza, la distancia se puede escribir a mano en Parámetros.
- **Los datos se guardan en cada celular.** Las vías y mediciones quedan en el navegador de quien las registra; no se comparten entre personas. Para el informe, copien las mediciones a Excel.
- **Atribución.** El mapa muestra "© OpenStreetMap" por requisito de su licencia. No lo quiten.
- **Los valores iniciales son ilustrativos.** Hasta que midan la vía, la app lo indica en el Simulador.
