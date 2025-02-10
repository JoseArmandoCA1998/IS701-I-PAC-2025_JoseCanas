#Ejercicio#2: Crea un programa el cual imprima una lista con los primeros 15 números de la sucesión de Fibonacci.
#Para efectos de práctica se realizará dejando abierto para que el usuario decida la cantidad de numeros.
#función realizada con recursividad, utilizaremos el valor y guardaremos el dato en memoria para reutilizarlo:

def serie_fibonacci(numero, diccionario={}):
    if numero in diccionario:
        return diccionario[numero]
    if numero <= 1:
        return numero
    else: diccionario[numero] = serie_fibonacci(numero - 1, diccionario) + serie_fibonacci(numero - 2, diccionario)
    return diccionario[numero]


while True:
  usuario_dato = input("Ingrese el numero hasta la funcion a calcular: ")
  try:
    n = int(usuario_dato)
    if n >=0:
      break
    else:
      print("Ingrese un valor numerico entero positivo: ")
  except ValueError:
    print("dato incorrecto, ingrese el valor nuevamente:")

if n == 0:
  print([0])
else:
  #Muestra los valores
  print([serie_fibonacci(i) for i in range(n)])