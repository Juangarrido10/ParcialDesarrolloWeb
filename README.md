# Primer Parcial de Desarrollo Web 

## Desarrolladores  
- Juan Manuel Garrido Amaya - 192544  
- Jhon Fernando Sanchez Santiago - 192551

# Fragmentos, Plantillas y Web Components  

## Fragmentos  
Son partes de código HTML que se separan en archivos distintos para ser reutilizados en varias páginas o secciones. Con esto se evita la duplicación y se facilita el mantenimiento del proyecto.  

## Plantillas  
Son estructuras HTML predefinidas que permiten organizar cómo se mostrará un contenido dinámico. A partir de una plantilla se pueden generar múltiples elementos similares con diferentes datos.  

## Web Components  
Tecnología nativa de los navegadores que permite crear elementos personalizados y reutilizables, con su propio comportamiento y estilos aislados dentro del *Shadow DOM*.  
En este proyecto se implementó el componente `<product-card>` para mostrar productos con su nombre, descripción, precio e imagen.  

# Implementación del Formulario de Inicio de Sesión  
- Se creó un formulario con campos para **usuario** y **contraseña**.  
- Se manejó el evento `submit` con JavaScript para:  
  - Prevenir el refresco de la página.  
  - Validar que los campos no estén vacíos.  
  - Comprobar credenciales y mostrar un mensaje de error o redirigir al usuario.  
- Se aplicaron estilos coherentes con el resto de la aplicación (colores, tipografía y diseño responsive).  

# Buenas Prácticas Aplicadas  
- **Modularización del código:** Se separaron los fragmentos (`header`, `sidebar`, `footer`) y el componente `<product-card>` en archivos distintos.  
- **Uso de Web Components:** Lógica y estilos encapsulados en el *Shadow DOM* para evitar conflictos de CSS y hacer las tarjetas reutilizables.  
- **Separación de datos y vista:** Los productos se cargan desde un archivo `products.json`, manteniendo independencia entre contenido y presentación.  
- **Accesibilidad y semántica:** Uso de etiquetas correctas y atributos `alt` en imágenes.  
- **Estilos consistentes y dinámicos:** Bordes redondeados, sombras suaves, transiciones y hover effects para mejorar la experiencia de usuario.  
