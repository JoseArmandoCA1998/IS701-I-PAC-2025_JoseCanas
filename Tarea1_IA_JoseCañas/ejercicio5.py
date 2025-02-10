#5. Dado el siguiente diccionario:
#data = {
#'Ciudad': ['Nueva York', 'Los Ángeles', 'Nueva York', 'Chicago'],
#'Ventas': [100, 150, 200, 50]
#}
#Agrupe los datos por ciudad y mostrar la suma por ciudades.
def agrupar_por_ciudad(data):
    grupos = {}
    # La función zip toma varios iterables como argumentos y devuelve un
    # iterador de tuplas.
    for ciudad, venta in zip(data['Ciudad'], data['Ventas']):
        if ciudad in grupos:
            grupos[ciudad] += venta
        else:
            grupos[ciudad] = venta
    return grupos
data = {
'Ciudad': ['Nueva York', 'Los Ángeles', 'Nueva York', 'Chicago'],
'Ventas': [100, 150, 200, 50]
}
resultado = agrupar_por_ciudad(data)
print(resultado)