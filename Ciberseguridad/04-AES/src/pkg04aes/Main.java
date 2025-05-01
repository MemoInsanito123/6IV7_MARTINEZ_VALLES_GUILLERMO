package pkg04aes;

import java.io.*;
import java.util.*;
public class Main {

    public static void main(String[] args) throws Exception{
        
        System.out.println("Ejremplo de cifrado AES");
        String mensaje = "Habia una vez un huevo y era muy huevon, tanto que faltaba varios dias a la escuela";
        
        String mensajeCifrado = CifradorAES.encrypt(mensaje);
        System.out.println("El mensaje cifrado es: " + mensajeCifrado);
        
        String mensajeDescifrado = CifradorAES.decrypt(mensajeCifrado);
        System.out.println("El mensaje descifrado es: " + mensajeDescifrado);
        
    }
    
}
