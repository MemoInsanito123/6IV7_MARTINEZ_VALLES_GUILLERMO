package pkg03des;

//Es para definir entradas y salidas del sistema para el manejo de archivos.
import java.io.*;
//Calculo de subllaves.
import java.security.*;
//Definir algoritmo de cifrado.
import javax.crypto.*;

//Para el algoritmo.
import javax.crypto.interfaces.*;
//Definir el tamaño de la clave y subclaves.
import javax.crypto.spec.*;

public class Main {

    public static void main(String[] args) throws Exception{
        
        /*Crear un programa que lea un archivo de texto plano, se debe introducir una clave
        debe cifrarlo y generar el archivo correspondiente.*/
        
        //Usaremos DES.
        if(args.length != 1){
            mensajeAyuda();
            System.exit(1);
        }
        
        //Paso 1: definir el algoritmo y su clave.
        System.out.println("1.- Generar las claves DES");
        //Para generar las claves usamos la clase KeyGenerator.
        KeyGenerator generadorDES = KeyGenerator.getInstance("DES");
        
        System.out.println("");
        //Debemos inicializar el tamaño de la clave.
        generadorDES.init(56); //El tamaño de la clave es de 64 - 8 bits de paridad.
        //El algoritmo envia error si no es exactamente de 56.
        
        /*Hay dos opciones para definir la clave, manual o con la clase SecretKey,
        si es manual se ingresa por parte del usuario, se valida que sean 8 caracteres Y
        luego transformamos la clave en bits.*/
        
        //Estas son las subclaves para las 16 rondas.
        SecretKey clave = generadorDES.generateKey();
        
        System.out.println("La clave es: " + clave);
        
        //NO es posible distinguir los  bytes de un caracter si no esta cifrado.
        mostrarBytes(clave.getEncoded());
        
        System.out.println("Clave codificada: " + clave.getEncoded());
        System.out.println("");
        
        /*El tipo de cifrado es DES, que es simetrico, lo que significa que la clave de cifrado es la misma para descrifrar.
        Hay que definir el modo de operacion del cifrado.
        El flujo es por bloques.
        ECB
        Si va a tener o no un relleno.
        Debemos de aplicar un estandar para el relleno.
        Este el estandar de relleno es "PKCS5" y hay que programarlo.*/
        
        Cipher cifrador = Cipher.getInstance("DES/ECB/PKCS5Padding");
        
        //Vamos a crear el menu para cifrar y descifrar.
        System.out.println("2.- Cifrar un fichero con DES: " + args[0]
                + " dejamos el resultado en: " + args[0] + ".cifrado");
        
        //Tenemos que cargar el archivo y ejecutar el cifrado.
        cifrador.init(Cipher.ENCRYPT_MODE, clave);
        
        //Aquí es importante recordar el modo.
        //ECB no puede automatizar el flujo del bloque.
        
        byte[] buffer = new byte[1000];
        //Este arreglo sirve para guardar el resultado.
        byte[] buffercifrado;
        
        //Definir el archivo.
        FileInputStream entrada = new FileInputStream(args[0]);
        FileOutputStream salida = new FileOutputStream(args[0] + ".cifrado");
        
        int bytesleidos = entrada.read(buffer, 0, 1000);
        
        while(bytesleidos != -1){
            buffercifrado = cifrador.update(buffer, 0, 1000);
            salida.write(buffercifrado);
            bytesleidos = entrada.read(buffer, 0, bytesleidos);
        }
        
        
        //Construir la salida.
        buffercifrado = cifrador.doFinal();
        //Generar el archivo de salida.
        salida.write(buffercifrado);
        
        entrada.close();
        salida.close();
        
        
        
        
        
        //Ahora el descifrado.
        
        //Vamos a crear el menu para cifrar y descifrar.
        System.out.println("3.- Descifrar un fichero con DES: " + args[0]
                + " dejamos el resultado en: " + args[0] + " descifrado");
        
        //Tenemos que cargar el archivo y ejecutar el cifrado.
        cifrador.init(Cipher.DECRYPT_MODE, clave);
        
        //Aquí es importante volver recordar el modo.
        //ECB no puede automatizar el flujo del bloque.
        
        
        //Este arreglo sirve para guardar el resultado.
        byte[] bufferdescifrado;
        
        //Definir el archivo.
        entrada = new FileInputStream(args[0] + ".cifrado");
        salida = new FileOutputStream(args[0] + ".descifrado");
        
        bytesleidos = entrada.read(buffer, 0, 1000);
        
        while(bytesleidos != -1){
            bufferdescifrado = cifrador.update(buffer, 0, bytesleidos);
            salida.write(bufferdescifrado);
            bytesleidos = entrada.read(buffer, 0, bytesleidos);
        }
        
        
        //Construir la salida.
        bufferdescifrado = cifrador.doFinal();
        //Generar el archivo de salida.
        salida.write(bufferdescifrado);
        
        entrada.close();
        salida.close();
        
    }   
    
        private static void mostrarBytes(byte[] buffer){
            //Gracias a ECB solo tenemos que escribir el formato del tipo de buffer para el archivo
            System.out.write(buffer, 0, buffer.length);
        }
    
        private static void mensajeAyuda(){
            System.out.println("Ejemplo de un programa "
                    + "que sirve para cifrar y descifrar con DES");
            System.out.println("Favor de ingresar un archivo de "
                    + "texto plano, si no funciona osea .txt");
    }
}