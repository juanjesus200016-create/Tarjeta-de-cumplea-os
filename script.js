document.addEventListener('DOMContentLoaded', () => {
  const sobre = document.getElementById('sobre');
  const tarjeta = document.getElementById('tarjeta');
  const musica = document.getElementById('musica');
  const botonCerrar = document.getElementById('boton-cerrar');

  sobre.addEventListener('click', () => {
    if (tarjeta.classList.contains('pantalla-completa')) return;
    if (sobre.classList.contains('abierto')) return;

    // 1. Abrir el sobre (La tapa se voltea, la foto sube)
    sobre.classList.add('abierto');
    
    // 2. Reproducir música
    musica.volume = 0.7;
    musica.play().catch(e => console.log('Audio bloqueado por el navegador', e));

    // 3. Esperar a que la foto suba (0.8s) y expandirla a pantalla completa
    setTimeout(() => {
      // Ocultamos el título y el texto inferior
      document.body.classList.add('modo-lectura');
      
      // Expandimos la foto
      tarjeta.classList.add('pantalla-completa');
      botonCerrar.classList.add('visible');
    }, 800); 
  });

  // Botón para cerrar (la X)
  botonCerrar.addEventListener('click', (e) => {
    e.stopPropagation(); 
    
    // 1. Quitar pantalla completa
    tarjeta.classList.remove('pantalla-completa');
    botonCerrar.classList.remove('visible');
    
    // 2. Volver a mostrar textos
    document.body.classList.remove('modo-lectura');
    
    // 3. Cerrar el sobre después de que la foto baje
    setTimeout(() => {
      sobre.classList.remove('abierto');
    }, 500); 
  });
});