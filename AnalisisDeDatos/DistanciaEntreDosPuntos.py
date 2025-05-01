import numpy as np
 import pandas as pd
 from scipy.spatial import distance
 import matplotlib.pyplot as plt
 
 # Calcular la matriz de distancias entre todos los puntos utilizando la métrica especificada.
 def calcular_distancias(puntos, metrica):
     distancias = pd.DataFrame(index=puntos.index, columns=puntos.index)
     for i in puntos.index:
         for j in puntos.index:
             if i != j: 
                 distancias.loc[i, j] = metrica(puntos.loc[i], puntos.loc[j])
     return distancias
 
 # Analizar la matriz de distancias para encontrar los puntos más cercanos y más lejanos.
 def analizar_distancias(distancias, nombre_metrica):
     # Encontrar la distancia máxima
     max_valor = distancias.max().max()
     par_max = distancias.stack().idxmax()
     
     # Encontrar la distancia mínima.
     min_valor = distancias.replace(0, np.nan).min().min()
     par_min = distancias.replace(0, np.nan).stack().idxmin()
     
     print(f"\n--- Resultados con distancia {nombre_metrica} ---")
     print(f"Distancia máxima: {max_valor:.2f} entre {par_max[0]} y {par_max[1]}")
     print(f"Distancia mínima: {min_valor:.2f} entre {par_min[0]} y {par_min[1]}")
 
 
 # Definimos las coordenadas de los puntos
 puntos = {
     'Punto A': (1, 1),
     'Punto B': (1, 5),
     'Punto C': (7, 1),
     'Punto D': (3, 3),
     'Punto E': (4, 8),
     'Punto F': (8, 2),
     'Punto G': (4, 6),
     'Punto H': (2, 1)
 }
 
 # Convertir las coordenadas a un dataframe para facilitar el cálculo
 df_puntos = pd.DataFrame(puntos).T
 df_puntos.columns = ['X', 'Y']
     
 print('=== ANÁLISIS DE DISTANCIAS ENTRE PUNTOS ===')
 print('\nCoordenadas de los Puntos:')
 print(df_puntos)
     
 # Calcular distancias usando diferentes métricas
 distancias_euclidiana = calcular_distancias(df_puntos, distance.euclidean)
 distancias_manhattan = calcular_distancias(df_puntos, distance.cityblock)
 distancias_chebyshev = calcular_distancias(df_puntos, distance.chebyshev)
     
 # Mostrar las matrices de distancias formateadas
 pd.set_option('display.precision', 2) 
     
 print('\nTabla de Distancias Euclidianas:')
 print(distancias_euclidiana.fillna('-'))
     
 print('\nTabla de Distancias Manhattan:')
 print(distancias_manhattan.fillna('-'))
     
 print('\nTabla de Distancias Chebyshev:')
 print(distancias_chebyshev.fillna('-'))
     
 # Analizar resultados
 analizar_distancias(distancias_euclidiana, 'Euclidiana')
 analizar_distancias(distancias_manhattan, 'Manhattan')
 analizar_distancias(distancias_chebyshev, 'Chebyshev')