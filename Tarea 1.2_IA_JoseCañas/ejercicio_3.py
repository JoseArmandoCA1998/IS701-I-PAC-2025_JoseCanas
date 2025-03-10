# -*- coding: utf-8 -*-
"""Untitled1.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1tj8kn6Y9tdoyJJkilU89HnZY3ytGobe7
"""

#Ejercicio 3: Estadísticas de Calificaciones
# Utilice el archivo calificaciones.csv para analizar el rendimiento de los estudiantes:
# . Cargue el dataset y muestre las primeras filas.
# . Calcule el promedio de calificaciones por materia.
# . Identifique el estudiante con el promedio más alto.
#. Agrupa las calificaciones por estudiante y calcule el promedio de cada uno.
# . Identifique cuántos estudiantes tienen un promedio superior a 85.
# . Encuentre la materia con la mayor cantidad de calificaciones registradas.
# . Muestre los 5 estudiantes con el promedio más bajo

import pandas as pd
df = pd.read_csv('calificaciones.csv')
df.head()

# Promedio por materia
#Agrupamos los valores de la Columna materia y a esos valores le sacmos el promedio con mean()
prom_mat = df.groupby('Materia')['Calificación'].mean() # Agrupa por 'Materia' y calcula el promedio de 'Calificación' para cada materia.
print("\nPromedio por materia:")
print(prom_mat) # Imprime los promedios por materia.

# Estudiante con promedio más alto
est_prom_alto = df.loc[df['Calificación'].idxmax(), 'Estudiante'] # Encuentra el estudiante con la calificación máxima usando idxmax() y loc[].
print("\nEstudiante con promedio más alto:", est_prom_alto) # Imprime el nombre del estudiante con el promedio más alto.

# Promedio por estudiante
prom_est = df.groupby('Estudiante')['Calificación'].mean() # Agrupa por 'Estudiante' y calcula el promedio de 'Calificación' para cada estudiante.
print("\nPromedio por estudiante:")
print(prom_est) # Imprime los promedios por estudiante.

# Estudiantes con promedio > 85
est_prom_alto_85 = prom_est[prom_est > 85].count() # Filtra los estudiantes con promedio mayor a 85 y cuenta cuántos hay.
print("\nNúmero de estudiantes con promedio > 85:", est_prom_alto_85) # Imprime la cantidad de estudiantes con promedio mayor a 85.

# Materia con más calificaciones
mat_mas_calif = df['Materia'].value_counts().idxmax() # Cuenta las calificaciones por materia y encuentra la materia con más calificaciones usando value_counts() e idxmax().
print("\nMateria con más calificaciones:", mat_mas_calif) # Imprime la materia con más calificaciones.

# 5 estudiantes con promedio más bajo
est_prom_bajo = prom_est.nsmallest(5) # Obtiene los 5 estudiantes con los promedios más bajos usando nsmallest().
print("\n5 estudiantes con promedio más bajo:")
print(est_prom_bajo) # Imprime los 5 estudiantes con los promedios más bajos.