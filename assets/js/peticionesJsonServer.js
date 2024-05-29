const d = document;


// OBTENER PRODUCTOS 

export async function getData() {
  try {
    const res = await fetch('https://json-server-six-zeta.vercel.app/figuras');
    let data = await res.json()
    return data;
   }catch (error) {
    console.error(error);
    return null;
  }
}

// CREAR PRODUCTO

export async function cargarProducto(producto) {
  try {
    if(!producto) return {error:"Los datos solicitados estan incompletos."}
    const res = await fetch('https://json-server-six-zeta.vercel.app/figuras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(producto)
    });

    if(res) return true
  } catch (error) {
    console.log(error);
  }
}


// ELIMINAR PRODUCTO

export async function  eliminarProducto(id) {
  try {
    const res = await fetch(`https://json-server-six-zeta.vercel.app/figuras/${id}` , {
      method: 'DELETE',
      headers: {
        "content-type" : "application/json"
      }
    });
    console.log(res)
   return res.status === 200 ? true :  false
  } catch (error) {
    return false
  }
}

