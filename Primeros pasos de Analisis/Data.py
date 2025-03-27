import pandas as pd
import matplotlib.pyplot as plt


#Hacer una instancia de pandas para que lee la data del Exel
df = pd.read_excel("proyecto1.xlsx")

# Guardar los datos de la columna en forma de una lista
listVentas = df['ventas_tot'].tolist()
listAdeudos = df['B_adeudo'].tolist()
listMeses = df['B_mes'].tolist()

cDeuda = 0
sDeuda = 0

# Mostrar la suma de las ventas totales del comercio
print(f'La venta total del comercio es de ${sum(listVentas)}')

#Mostrar cuantos clientes tienen deuda y cuantos no, y su porcentaje
for i in listAdeudos:
    if(i == 'Con adeudo'):
        cDeuda += 1
    elif(i == 'Sin adeudo'):
        sDeuda += 1
    else:
        pass
else:
    print(f'De {len(listAdeudos)} clientes, {cDeuda} tienen deuda y {sDeuda} no tienen deuda. {(cDeuda * 100)/len(listAdeudos)}% tiene deuda y el {(sDeuda * 100)/len(listAdeudos)}% no tiene deuda')

#Grafica de barras con respecto el tiempo
plt.bar(listMeses, listVentas, color='blue')
plt.xlabel("Tiempo")
plt.ylabel("Ventas Totales")
plt.title("Ventas Tortales con respecto el Tiempo")

# Mostrar la gráfica
plt.show()