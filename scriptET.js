//Función que me aplica el estilo a la opciòn seleccionada y quita la previamente seleccionada
function seleccionar(link) {
    var opciones = document.querySelectorAll('#links  a');
    opciones[0].className = "";
    opciones[1].className = "";
    opciones[2].className = "";
    opciones[3].className = "";
    opciones[4].className = "";
    link.className = "seleccionado";

    //Hacemos desaparecer el menu una vez que se ha seleccionado una opcion
    //en modo responsive
    var x = document.getElementById("nav");
    x.className = "";
}

//función que muestra el menu responsive
function responsiveMenu() {
    var x = document.getElementById("nav");
    if (x.className === "") {
        x.className = "responsive";
    } else {
        x.className = "";
    }
}

//detecto el scrolling para aplicar la animación del la barra de habilidades
window.onscroll = function() { efectoHabilidades() };

//funcion que aplica la animación de la barra de habilidades
function efectoHabilidades() {
    var skills = document.getElementById("skills");
    var distancia_skills = window.innerHeight - skills.getBoundingClientRect().top;
    var existe = document.getElementsByClassName("barra-progreso1");
    //if (distancia_skills >= 300) {
    if (existe.length == 0) {
        document.getElementById("html").classList.add("barra-progreso1");
        document.getElementById("js").classList.add("barra-progreso2");
        document.getElementById("bd").classList.add("barra-progreso3");
        document.getElementById("ps").classList.add("barra-progreso4");
    } else {
        document.getElementById("html").classList.remove("barra-progreso1");
        document.getElementById("js").classList.remove("barra-progreso2");
        document.getElementById("bd").classList.remove("barra-progreso3");
        document.getElementById("ps").classList.remove("barra-progreso4");
        /**************/
    }
}

// Función para manejar el envío del formulario sin recargar la página
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-contacto');
    if (formulario) {
        formulario.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const messagenDiv = document.getElementById('mensaje-respuesta');
            const submitBtn = this.querySelector('.btn-enviar');
            const originalText = submitBtn.value;
            
            // Cambiar el texto del botón mientras se envía
            submitBtn.value = 'Enviando...';
            submitBtn.disabled = true;
            
            // Enviar el formulario con Fetch API
            fetch('https://formsubmit.co/c1b70c0945733555188c8f6d3b4aefae', {
                method: 'POST',
                body: new FormData(this),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Mostrar mensaje de éxito
                    messagenDiv.innerHTML = '<p style="color: #4CAF50; font-size: 16px; font-weight: bold;">✓ ¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.</p>';
                    messagenDiv.style.display = 'block';
                    
                    // Limpiar el formulario
                    formulario.reset();
                    
                    // Ocultar el mensaje después de 5 segundos
                    setTimeout(() => {
                        messagenDiv.style.display = 'none';
                    }, 5000);
                } else {
                    throw new Error('Error en la respuesta del servidor');
                }
            })
            .catch(error => {
                // Mostrar mensaje de error
                messagenDiv.innerHTML = '<p style="color: #f44336; font-size: 16px; font-weight: bold;">✗ Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.</p>';
                messagenDiv.style.display = 'block';
                
                // Ocultar el mensaje después de 5 segundos
                setTimeout(() => {
                    messagenDiv.style.display = 'none';
                }, 5000);
            })
            .finally(() => {
                // Restaurar el botón
                submitBtn.value = originalText;
                submitBtn.disabled = false;
            });
        });
    }
});