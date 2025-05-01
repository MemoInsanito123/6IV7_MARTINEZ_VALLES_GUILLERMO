package pkg04aes;

import java.security.*;
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import sun.misc.*;

public class CifradorAES {
    
    //Generar las subllaves y los metodos para cifrar y desciffrar
    
    //metodo para la llave
    
    public static final byte[] keyvalue = new byte[]{
     
        /*
        Recordemos que dentro de AES se van a manejar diferentes tamaños de la llave de acuerdo a el tipo de operacion
        128: 16 caracters y 9 rondas
        192: 24 caracteres y 11 rondas
        256: 32 caracteres y 13 rondas
        */
        
        'q','w','e','r','t','y','u','i',
        'q','w','e','r','t','y','u','i'
    };
    
    //vamos a definir la instancia del algoritmo
    private static final String instancia = "AES";
        
    
    public static String encrypt(String Data) throws Exception{
      /*
        Para poder cifrar debemos de generar las subclaves necesarias para ejecutar el algoritmo acorde al numero de rondas
        para ello vamos a ocupar un metodo de generacion de claves
        */  
      
      Key subllave = generateKey();
      
      //inicializamos el cifrado
      Cipher cifrado = Cipher.getInstance(instancia);
      
      cifrado.init(Cipher.ENCRYPT_MODE, subllave);
      
      //vamos a obtener el mensaje que se quiere cifrar y transformarlos
      byte[] encValores = cifrado.doFinal(Data.getBytes());
      
        System.out.println("Mensaje cifrado sin formato: " + encValores);
        
        //debemos aplicar formato de codificacion base 64 a partir de la libreria sun con un objeto BASE64Encoder
        //String valoresencriptadosformato = new BASE64Encoder().encode(encValores);
        
        String cadenaEncriptada = encValores.toString();
        
        return cadenaEncriptada;
    }
    
    public static String decrypt(String valoresencriptados) throws Exception{
      /*
        Para poder cifrar debemos de generar las subclaves necesarias para ejecutar el algoritmo acorde al numero de rondas
        para ello vamos a ocupar un metodo de generacion de claves
        */  
      
      Key subllave = generateKey();
      
      //inicializamos el cifrado
      Cipher cifrado = Cipher.getInstance(instancia);
      
      cifrado.init(Cipher.DECRYPT_MODE, subllave);
      
      //vamos a obtener el mensaje que se quiere cifrar y transformarlos
      //byte[] decodificarvalores = new BASE64Decoder().decodeBuffer(valoresencriptados);
      
        byte [] decValores = cifrado.doFinal(valoresencriptados.getBytes());
      
        System.out.println("Mensaje descifrado sin formato: " + decValores);
        
        //debemos aplicar formato de codificacion base 64 a partir de la libreria sun con un objeto BASE64Encoder
        //String valoresencriptadosformato = new BASE64Encoder().encode(encValores);
        
        String valoresDescifrados = new String(decValores);
        
        return valoresDescifrados;
    }

    private static Key generateKey() throws Exception {
        // vamos a ocupoar llaves a partir de SecretKeySpec
        Key subllaveUwu = new SecretKeySpec(keyvalue, instancia);
        return subllaveUwu;
    }
}