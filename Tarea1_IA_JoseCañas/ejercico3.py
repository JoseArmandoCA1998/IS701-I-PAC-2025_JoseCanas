#3. Crea un programa que devuelva una lista con todos los elementos únicos de otra lista
#Esta lista no está definido con el tipo o valor a trabajar por lo que se dejará abierta para que el usuario ingrese cualquier dato.
def elementos_unicos(lista):
  #convierte los datos de la lista en un conjunto, lo cual elimina la duplicidad con el comando set
  datos_unificados = set(lista)
  #convertimos los datos a una lista nuevamente
  nueva_lista = list(datos_unificados)
  return nueva_lista
lista_usuario = input("Ingrese los elementos de la lista: ")
#Para convertir la cadena en lista:
lista_usuario = lista_usuario.split(" ")


print(elementos_unicos(lista_usuario))