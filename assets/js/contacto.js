const gracias = document.getElementById("gracias")
if(gracias){
      gracias.value=base_url+"/pages/contacto.html"
      const gracias_value= localStorage.getItem("gracias")
      if(gracias_value){
            document.getElementById("submitted_text").innerHTML="Gracias por escribirnos! su correo será respondido a la brevedad"
            localStorage.removeItem("gracias")
      }
}
const enviar_correo = document.getElementById("enviar_correo")
if(enviar_correo){
      enviar_correo.addEventListener("submit", () => {
            localStorage.setItem("gracias","submitted")
      })
}