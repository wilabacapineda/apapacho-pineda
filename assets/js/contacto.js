const gracias = document.getElementById("gracias")
if(gracias){
      gracias.value=base_url+"/pages/contacto.html"
}
const enviar_correo = document.getElementById("enviar_correo")
if(enviar_correo){
    enviar_correo.addEventListener("submit", (e) => {
        e.preventDefault()
        if (validate_form()==true) {
            const submitted_text = document.getElementById("submitted_text")
            const enviando = document.getElementById("enviando")
            const parentEnviando = enviando.parentElement
            const cargando = `<div class="spinner-border text-info" role="status">
                                <span class="sr-only">Loading...</span>
                            </div>`
            const width = parentEnviando.offsetWidth;
            const height = parentEnviando.offsetHeight;            
            enviando.className="prender"
            enviando.style.width=width+"px"
            enviando.style.height=height+"px"
            enviando.innerHTML = cargando                      
            
            const formData = new FormData(enviar_correo) 
            fetch("https://formsubmit.co/4913ef988825dc4a832f28286317e7cb", {
                method: "POST",
                body: formData
            })
            .then(res => {
                if(res.statusText=="OK" || res.ok == true){
                    enviando.innerHTML=""
                    enviando.className=""
                    submitted_text.style.display="block"
                    submitted_text.innerHTML="Gracias por escribirnos! su correo será respondido a la brevedad"
                    enviar_correo.style.display="none"
                } else {
                    enviando.innerHTML=""
                    enviando.className=""
                    submitted_text.style.display="block"
                    submitted_text.innerHTML="Error al enviar el correo, por favor intente nuevamente"
                }
            })
            .catch((error) => {
                submitted_text.style.display="block"
                submitted_text.innerHTML="Error al enviar el correo, por favor intente nuevamente"
                console.log(error)
            }) 
        } else {
            Swal.fire('Ingrese correctamente todos los campos requeridos')
        }                          
    })
}

const validate_form = () => {
    let todo_correcto = true
    if(document.getElementById('inputName4').value.length < 2 ){
        todo_correcto = false
    }
    const expresion_mail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
    const email = document.getElementById('inputEmail4').value
    if (!expresion_mail.test(email)){
        todo_correcto = false
    }

    const exp_tel = /^(\+?56)?(\s?)(0?9)(\s?)[98765432]\d{7}$/
    const tel = document.getElementById("inputTel").value
    if (!exp_tel.test(tel)){
        todo_correcto = false
    }

    if(document.getElementById('textareaMessage').value.length < 0 ){
        todo_correcto = false
    }

    return todo_correcto

}