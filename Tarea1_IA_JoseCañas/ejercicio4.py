#4. Crea un programa que almacene información sobre productos y sus precios en un diccionario, esta información debe ser ingresada desde teclado.
#Tomaremos como base que esto lo aplicaríamos en una factura por lo que no vamos a repetir los productos.
#se realiza con una función para hacerlo más eficiente:
def datos_productos():
  diccionario = {}
  while True:
    datos_usuario = input("ingrese el nombre del producto o escriba salir para finalizar: ")
    #convierte el texto a minúsculas en caso de que el usuario escriba alguna letra en mayuscula
    if datos_usuario.lower() == "salir":
        break
    if datos_usuario in diccionario:
        print("el producto ya existe")
        continue
    try:
        precio = float(input("ingrese el precio del producto: "))
    except ValueError:
          print("ingrese un valor numérico")
          continue
    diccionario[datos_usuario] = precio
  return diccionario
productos = datos_productos()
print("Productos ingresados:", productos)