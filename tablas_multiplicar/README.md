# Tablas de Multiplicar (React + Vite)

Aplicación para practicar tablas de multiplicar con:

- Selección de una o varias tablas (1–10) usando tarjetas llamativas y números animados
- Preguntas en orden aleatorio sin repetición (Fisher–Yates)
- Mensajes motivadores estilo IA (arrays) para respuestas correctas/incorrectas
- Resultados finales con porcentaje de aciertos/errores y retroalimentación visual (≥75% feliz, <75% estudiando)

Consigna de referencia: https://juegocok8.github.io/parcial2/claveb.html

## Ejecutar

1) Instalar dependencias

`npm install`

2) Iniciar en desarrollo

`npm run dev`



## Lógica implementada (resumen)

- Se genera la lista de preguntas con pares `{ table, multiplier }` para cada tabla seleccionada y multiplicadores del 1 al 10.
- La lista completa se mezcla con el algoritmo Fisher–Yates en `src/utils/fisherYates.js` para garantizar orden aleatorio sin repetición.
- En cada respuesta se valida el resultado y se elige un mensaje aleatorio desde arrays (`src/data/messages.js`).
- Al finalizar se calcula:
	- $\%\,aciertos = \text{round}(correct/total \cdot 100)$
	- $\%\,errores = 100 - \%\,aciertos$

## Estructura principal

- Páginas: `src/pages` (Inicio, Selección, Práctica, Resultados)
- Estado compartido: `src/context/PracticeContext.jsx`
- Componentes UI: `src/components`
