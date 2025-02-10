#Tarea1 de IA
#1. Crea un programa que sume todos los números de una lista (sin usar el método nativo de Python “sum”)
#Se trabajará con una función.
def num_sum(datos):
  suma = 0
  for num in datos:
    suma += num
  return suma
  #Declaramos la variable de numeros del usurio:
#datos_usuario = input("Ingrese los valores a sumar: ")
#Protección contra los usuarios, obligarlos a ingresar solo número como dato:
#Forma eficiente para este caso:
#while not datos_usuario.replace(".", "", 1).isdigit():
#  datos_usuario = input("Ingrese los valores a sumar: ")
#Otra manera de hacerlo sería con un While convencional con un try:
while True:
  datos_usuario = input("Ingrese los valores a sumar: ")
  try:
    lista_datos = datos_usuario.split()
    n_datos = [float(num) for num in lista_datos]
    break
  except ValueError:
      print("Por favor, ingrese solo números.")
#Separar los datos en una lista de subcadenas(strings) y luego convertimos la cadena en numeros:
#lista_datos = datos_usuario.split() #split() usa los espacios que hay entre cada numero como delimitador.
#conversión a números:
#n_datos = [float(num) for num in lista_datos]
#imprimir la sumatoria utilizando la función creada:
num_sum(n_datos)
print(num_sum(n_datos))